// TURMUX-CT — Time Travel Command System
// ===================================================================================
// Commands:
//   man / terminal / turmux / terminator → show this command manual
//   comment <text>                       → leave a comment for the site
//   delete comment #N                    → delete comment number N
//   comment clear                        → delete all comments
//   comments                             → show all comments
//   complain <text>                      → file a complaint
//   delete complain #N                   → delete complaint number N
//   complain clear                       → delete all complaints
//   complaints                           → show all complaints
//   change code to date=N                → revert page to commit by date
//   change code to version=N             → revert page to commit by version number
//   commit save                           → save current state as a new commit
//   commit now                            → save with auto date
//   commit log                            → show all commits
// ===================================================================================

function getSnapshotKey(date) {
  return "ct_snap_" + date;
}

function getCommitKey(varNum) {
  return "ct_var_" + varNum;
}

function saveCommit(label) {
  let pageHTML = document.getElementById("ful-page").innerHTML;
  let now = new Date();
  let dateStr = now.toISOString().split("T")[0];
  let timeStr = now.toTimeString().split(" ")[0];
  let commitLabel = label || "commit on " + dateStr + " " + timeStr;

  let commitIndex = getNextVarNum();

  let commitData = {
    var: commitIndex,
    date: dateStr,
    time: timeStr,
    label: commitLabel,
    html: pageHTML,
  };

  localStorage.setItem(getCommitKey(commitIndex), JSON.stringify(commitData));
  localStorage.setItem(getSnapshotKey(dateStr), JSON.stringify(commitData));
  localStorage.setItem("ct_commit_count", commitIndex);

  return commitData;
}

function getNextVarNum() {
  let count = parseInt(localStorage.getItem("ct_commit_count") || "0", 10);
  return count + 1;
}

function getCurrentVarNum() {
  return parseInt(localStorage.getItem("ct_commit_count") || "0", 10);
}

function restoreCommit(commitData) {
  if (!commitData || !commitData.html) {
    return false;
  }
  document.getElementById("ful-page").innerHTML = commitData.html;
  return true;
}

function getCommitByDate(dateStr) {
  let data = localStorage.getItem(getSnapshotKey(dateStr));
  if (data) return JSON.parse(data);

  let count = getCurrentVarNum();
  for (let i = count; i >= 1; i--) {
    let commit = localStorage.getItem(getCommitKey(i));
    if (commit) {
      let parsed = JSON.parse(commit);
      if (parsed.date === dateStr) return parsed;
    }
  }
  return null;
}

function getCommitByVar(varNum) {
  let data = localStorage.getItem(getCommitKey(varNum));
  if (data) return JSON.parse(data);
  return null;
}

function showCommitLog() {
  let count = getCurrentVarNum();
  if (count === 0) {
    return "No commits yet. Use 'commit save' to make your first commit!";
  }

  let log = "COMMIT LOG\n========================\n";
  for (let i = 1; i <= count; i++) {
    let commit = getCommitByVar(i);
    if (commit) {
      log +=
        "version:" +
        commit.var +
        " | " +
        commit.date +
        " " +
        commit.time +
        " | " +
        commit.label +
        "\n";
    }
  }
  log += "========================\nTotal: " + count + " commits";
  return log;
}

function runCommand(input) {
  let cmd = input.trim().toLowerCase();
  let output = "";

  let dateMatch = cmd.match(/(?:chnge|change) code to date=(\d+)/);
  if (dateMatch) {
    let varNum = parseInt(dateMatch[1], 10);
    let commit = getCommitByVar(varNum);
    if (commit) {
      restoreCommit(commit);
      output =
        "Time-traveled to date=" +
        varNum +
        " (version:" +
        commit.var +
        ") — " +
        commit.label;
    } else {
      output =
        "No commit found at date=" +
        varNum +
        ". Max version is " +
        getCurrentVarNum();
    }
    return output;
  }

  let varMatch = cmd.match(/(?:chnge|change) code to (?:var|version)=(\d+)/);
  if (varMatch) {
    let varNum = parseInt(varMatch[1], 10);
    let commit = getCommitByVar(varNum);
    if (commit) {
      restoreCommit(commit);
      output =
        "Time-traveled to version:" +
        varNum +
        " (" +
        commit.date +
        ") — " +
        commit.label;
    } else {
      output =
        "No commit found at version:" +
        varNum +
        ". Max version is " +
        getCurrentVarNum();
    }
    return output;
  }

  if (
    cmd === "commit save" ||
    cmd === "commit sv" ||
    cmd === "commit now" ||
    cmd === "commit nw"
  ) {
    let label =
      cmd === "commit now" || cmd === "commit nw"
        ? "auto commit"
        : "manual commit";
    let commit = saveCommit(label);
    output =
      "Saved! version:" + commit.var + " | " + commit.date + " " + commit.time;
    return output;
  }

  if (cmd === "commit log") {
    output = showCommitLog();
    return output;
  }

  // delete comment #N — delete a specific comment via SQLite
  let commentDeleteMatch = cmd.match(/^delete comment #(\d+)$/);
  if (commentDeleteMatch) {
    let num = parseInt(commentDeleteMatch[1], 10);
    let csrfToken = document.querySelector('meta[name="csrf-token"]');
    let csrfValue = csrfToken ? csrfToken.getAttribute("content") : "";
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/comments/" + num, false);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    if (csrfValue) xhr.setRequestHeader("X-CSRF-Token", csrfValue);
    try {
      xhr.send();
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        output = data.message || "Comment deleted!";
      } else if (xhr.status === 404) {
        output = "Comment #" + num + " not found.";
      } else {
        let data = JSON.parse(xhr.responseText);
        output = data.errors
          ? data.errors.join(", ")
          : "Error deleting comment.";
      }
    } catch (e) {
      output = "Network error deleting comment.";
    }
    return output;
  }

  // comment clear — delete all comments via SQLite
  if (cmd === "comment clear") {
    let password = prompt("enter password to clear all comments:");
    if (password !== "@sqwerty") {
      output = "wrong password! comments not cleared.";
      return output;
    }
    let csrfToken = document.querySelector('meta[name="csrf-token"]');
    let csrfValue = csrfToken ? csrfToken.getAttribute("content") : "";
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/comments/clear", false);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    if (csrfValue) xhr.setRequestHeader("X-CSRF-Token", csrfValue);
    try {
      xhr.send();
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        output = data.message || "Comments cleared!";
      } else {
        output = "Error clearing comments.";
      }
    } catch (e) {
      output = "Network error clearing comments.";
    }
    return output;
  }

  // comment man / comments man — show comment commands
  if (cmd === "comment man" || cmd === "comments man") {
    output =
      "Comment Commands\n" +
      "========================\n" +
      "comment <text>\n" +
      "  → leave a comment for the site\n\n" +
      "delete comment #N\n" +
      "  → delete comment number N\n\n" +
      "comment clear\n" +
      "  → delete all comments\n\n" +
      "comments\n" +
      "  → show all comments";
    return output;
  }

  // comment <text> — save a user comment to SQLite
  let commentMatch = cmd.match(/^comment\s+(.+)/);
  if (commentMatch) {
    let text = input.trim().replace(/^comment\s+/i, "");
    let username = sessionStorage.getItem("ct_username") || "anonymous";
    let now = new Date();
    let dateStr = now.toISOString().split("T")[0];
    let timeStr = now.toTimeString().split(" ")[0];

    let csrfToken = document.querySelector('meta[name="csrf-token"]');
    let csrfValue = csrfToken ? csrfToken.getAttribute("content") : "";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/comments", false);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    if (csrfValue) xhr.setRequestHeader("X-CSRF-Token", csrfValue);
    try {
      xhr.send(
        JSON.stringify({
          comment: { user: username, text: text, date: dateStr, time: timeStr },
        }),
      );
      if (xhr.status === 201) {
        let data = JSON.parse(xhr.responseText);
        output = data.message || "Comment saved! 🐾";
      } else {
        let data = JSON.parse(xhr.responseText);
        output = data.errors ? data.errors.join(", ") : "Error saving comment.";
      }
    } catch (e) {
      output = "Network error saving comment.";
    }
    return output;
  }

  // comments — show all comments from SQLite
  if (cmd === "comments") {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/comments", false);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Accept", "application/json");
    try {
      xhr.send();
      if (xhr.status === 200) {
        let comments = JSON.parse(xhr.responseText);
        if (comments.length === 0) {
          output = "No comments yet. Be the first! Use: comment <text>";
        } else {
          output = "COMMENTS\n========================\n";
          for (let i = 0; i < comments.length; i++) {
            output +=
              comments[i].id +
              ". " +
              comments[i].user +
              " (" +
              comments[i].date +
              " " +
              comments[i].time +
              ")\n" +
              '   "' +
              comments[i].text +
              '"\n\n';
          }
          output +=
            "========================\nTotal: " + comments.length + " comments";
        }
      } else {
        output = "Error loading comments.";
      }
    } catch (e) {
      output = "Network error loading comments.";
    }
    return output;
  }

  // delete complain #N — delete a specific complaint via SQLite
  let complainDeleteMatch = cmd.match(/^delete complain #(\d+)$/);
  if (complainDeleteMatch) {
    let num = parseInt(complainDeleteMatch[1], 10);
    let csrfToken = document.querySelector('meta[name="csrf-token"]');
    let csrfValue = csrfToken ? csrfToken.getAttribute("content") : "";
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/complaints/" + num, false);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    if (csrfValue) xhr.setRequestHeader("X-CSRF-Token", csrfValue);
    try {
      xhr.send();
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        output = data.message || "Complaint deleted!";
      } else if (xhr.status === 404) {
        output = "Complaint #" + num + " not found.";
      } else {
        let data = JSON.parse(xhr.responseText);
        output = data.errors
          ? data.errors.join(", ")
          : "Error deleting complaint.";
      }
    } catch (e) {
      output = "Network error deleting complaint.";
    }
    return output;
  }

  // complain clear — delete all complaints via SQLite
  if (cmd === "complain clear") {
    let password = prompt("enter password to clear all complaints:");
    if (password !== "@sqwerty") {
      output = "wrong password! complaints not cleared.";
      return output;
    }
    let csrfToken = document.querySelector('meta[name="csrf-token"]');
    let csrfValue = csrfToken ? csrfToken.getAttribute("content") : "";
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/complaints/clear", false);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    if (csrfValue) xhr.setRequestHeader("X-CSRF-Token", csrfValue);
    try {
      xhr.send();
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        output = data.message || "Complaints cleared!";
      } else {
        output = "Error clearing complaints.";
      }
    } catch (e) {
      output = "Network error clearing complaints.";
    }
    return output;
  }

  // complain man / complaints man — show complaint commands
  if (cmd === "complain man" || cmd === "complaints man") {
    output =
      "Complaint Commands\n" +
      "========================\n" +
      "complain <text>\n" +
      "  → file a complaint\n\n" +
      "delete complain #N\n" +
      "  → delete complaint number N\n\n" +
      "complain clear\n" +
      "  → delete all complaints\n\n" +
      "complaints\n" +
      "  → show all complaints";
    return output;
  }

  // complain <text> — save a user complaint to SQLite
  let complainMatch = cmd.match(/^complain\s+(.+)/);
  if (complainMatch) {
    let text = input.trim().replace(/^complain\s+/i, "");
    let username = sessionStorage.getItem("ct_username") || "anonymous";
    let now = new Date();
    let dateStr = now.toISOString().split("T")[0];
    let timeStr = now.toTimeString().split(" ")[0];

    let csrfToken = document.querySelector('meta[name="csrf-token"]');
    let csrfValue = csrfToken ? csrfToken.getAttribute("content") : "";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/complaints", false);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    if (csrfValue) xhr.setRequestHeader("X-CSRF-Token", csrfValue);
    try {
      xhr.send(
        JSON.stringify({
          complaint: {
            user: username,
            text: text,
            date: dateStr,
            time: timeStr,
          },
        }),
      );
      if (xhr.status === 201) {
        let data = JSON.parse(xhr.responseText);
        output = data.message || "Complaint filed! 🐾";
      } else {
        let data = JSON.parse(xhr.responseText);
        output = data.errors
          ? data.errors.join(", ")
          : "Error filing complaint.";
      }
    } catch (e) {
      output = "Network error filing complaint.";
    }
    return output;
  }

  // complaints — show all complaints from SQLite
  if (cmd === "complaints") {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/complaints", false);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Accept", "application/json");
    try {
      xhr.send();
      if (xhr.status === 200) {
        let complaints = JSON.parse(xhr.responseText);
        if (complaints.length === 0) {
          output = "No complaints yet. Use: complain <text>";
        } else {
          output = "COMPLAINTS\n========================\n";
          for (let i = 0; i < complaints.length; i++) {
            output +=
              complaints[i].id +
              ". " +
              complaints[i].user +
              " (" +
              complaints[i].date +
              " " +
              complaints[i].time +
              ")\n" +
              '   "' +
              complaints[i].text +
              '"\n\n';
          }
          output +=
            "========================\nTotal: " +
            complaints.length +
            " complaints";
        }
      } else {
        output = "Error loading complaints.";
      }
    } catch (e) {
      output = "Network error loading complaints.";
    }
    return output;
  }

  // man <topic> — show specific command manual
  let manTopicMatch = cmd.match(/^(man|turmux|terminal|terminator)\s+(.+)/);
  if (manTopicMatch) {
    let topic = manTopicMatch[2].trim();
    if (topic === "comment" || topic === "comments") {
      output =
        "Comment Commands\n" +
        "========================\n" +
        "comment <text>\n" +
        "  → leave a comment for the site\n\n" +
        "delete comment #N\n" +
        "  → delete comment number N\n\n" +
        "comment clear\n" +
        "  → delete all comments\n\n" +
        "comments\n" +
        "  → show all comments";
    } else if (topic === "complain" || topic === "complaints") {
      output =
        "Complaint Commands\n" +
        "========================\n" +
        "complain <text>\n" +
        "  → file a complaint\n\n" +
        "delete complain #N\n" +
        "  → delete complaint number N\n\n" +
        "complain clear\n" +
        "  → delete all complaints\n\n" +
        "complaints\n" +
        "  → show all complaints";
    } else if (topic === "commit") {
      output =
        "Commit Commands\n" +
        "========================\n" +
        "commit save\n" +
        "  → save current state as a new commit\n\n" +
        "commit now\n" +
        "  → save with auto date\n\n" +
        "commit log\n" +
        "  → show all commits";
    } else {
      output = "Unknown topic: " + topic + ". Try: comment, complain, commit";
    }
    return output;
  }

  // terminal / turmux / terminator — show command man
  if (
    cmd === "man" ||
    cmd === "turmux" ||
    cmd === "terminal" ||
    cmd === "terminator"
  ) {
    output =
      "Manual/turmux/terminal/terminator — Command Manual\n" +
      "========================\n" +
      "man / turmux / terminal / terminator\n" +
      "  → show this command manual\n\n" +
      "man <topic>\n" +
      "  → show manual for a specific topic (comment, complain, commit)\n\n" +
      "change code to date=N\n" +
      "  → revert page to commit version:N\n\n" +
      "change code to version=N\n" +
      "  → revert page to commit version:N\n\n" +
      "comment <text>\n" +
      "  → leave a comment for the site\n\n" +
      "delete comment #N\n" +
      "  → delete comment number N\n\n" +
      "comment clear\n" +
      "  → delete all comments\n\n" +
      "comments\n" +
      "  → show all comments\n\n" +
      "complain <text>\n" +
      "  → file a complaint\n\n" +
      "delete complain #N\n" +
      "  → delete complaint number N\n\n" +
      "complain clear\n" +
      "  → delete all complaints\n\n" +
      "complaints\n" +
      "  → show all complaints\n\n" +
      "commit save\n" +
      "  → save current state as a new commit\n\n" +
      "commit now\n" +
      "  → save with auto date\n\n" +
      "commit log\n" +
      "  → show all commits\n" +
      "========================";
    return output;
  }

  output =
    "Unknown command. Try:\n- terminal / turmux / terminator (show manual)\n- man <topic> (show manual for comment, complain, commit)\n- comment <text> (leave a comment)\n- delete comment #N (delete a comment)\n- comment clear (delete all comments)\n- comments (show all comments)\n- complain <text> (file a complaint)\n- delete complain #N (delete a complaint)\n- complain clear (delete all complaints)\n- complaints (show all complaints)\n- change code to date=N\n- change code to version=N\n- commit save\n- commit now\n- commit log";
  return output;
}

function handlePowerCommand() {
  let input = document.getElementById("power-input").value;
  if (!input.trim()) return;

  let result = runCommand(input);
  document.getElementById("power-output").textContent = result;
  document.getElementById("power-input").value = "";
}

function initPower() {
  let count = getCurrentVarNum();
  if (count === 0) {
    saveCommit("initial state");
  }
}
