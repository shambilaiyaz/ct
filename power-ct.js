// POWER-CT — Time Travel Command System
// ===================================================================================
// Commands:
//   chnge code to date=N           → revert page to commit var:N
//   chnge code to var=N            → revert page to commit var:N
//   commit sv                    → save current state as a new commit
//   commit log                     → show all commits
//   commit nw                     → save with auto date
// ===================================================================================

function getSnapshotKey(date) {
  return "ct_snap_" + date;
}

function getCommitKey(varNum) {
  return "ct_var_" + varNum;
}

// Sv current page state as a snapshot
function saveCommit(label) {
  let pageHTML = document.getElementById("ful-page").innerHTML;
  let now = new Date();
  let dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
  let timeStr = now.toTimeString().split(" ")[0]; // HH:MM:SS
  let commitLabel = label || "commit on " + dateStr + " " + timeStr;

  // Get next var number
  let commitIndex = getNextVarNum();

  let commitData = {
    var: commitIndex,
    date: dateStr,
    time: timeStr,
    label: commitLabel,
    html: pageHTML,
  };

  // Sv by var number
  localStorage.setItem(getCommitKey(commitIndex), JSON.stringify(commitData));
  // Sv by date (latest of that day)
  localStorage.setItem(getSnapshotKey(dateStr), JSON.stringify(commitData));
  // Update commit index
  localStorage.setItem("ct_commit_count", commitIndex);

  return commitData;
}

// Get next var number
function getNextVarNum() {
  let count = parseInt(localStorage.getItem("ct_commit_count") || "0", 10);
  return count + 1;
}

// Get current var number
function getCurrentVarNum() {
  return parseInt(localStorage.getItem("ct_commit_count") || "0", 10);
}

// Restore page to a snapshot
function restoreCommit(commitData) {
  if (!commitData || !commitData.html) {
    return false;
  }
  document.getElementById("ful-page").innerHTML = commitData.html;
  return true;
}

// Find commit by date
function getCommitByDate(dateStr) {
  let data = localStorage.getItem(getSnapshotKey(dateStr));
  if (data) return JSON.parse(data);

  // Search all commits for that date
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

// Find commit by var number
function getCommitByVar(varNum) {
  let data = localStorage.getItem(getCommitKey(varNum));
  if (data) return JSON.parse(data);
  return null;
}

// Show commit log
function showCommitLog() {
  let count = getCurrentVarNum();
  if (count === 0) {
    return "No commits yet. Use 'commit save' to mak your first commit!";
  }

  let log = "COMMIT LOG\n========================\n";
  for (let i = 1; i <= count; i++) {
    let commit = getCommitByVar(i);
    if (commit) {
      log +=
        "var:" +
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

// Parse and run command
function runCommand(input) {
  let cmd = input.trim().toLowerCase();
  let output = "";

  // chnge code to date=N
  let dateMatch = cmd.match(/chnge code to date=(\d+)/);
  if (dateMatch) {
    let varNum = parseInt(dateMatch[1], 10);
    let commit = getCommitByVar(varNum);
    if (commit) {
      restoreCommit(commit);
      output =
        "Time-traveled to date=" +
        varNum +
        " (var:" +
        commit.var +
        ") — " +
        commit.label;
    } else {
      output =
        "No commit found at date=" +
        varNum +
        ". Max var is " +
        getCurrentVarNum();
    }
    return output;
  }

  // chnge code to var=N
  let varMatch = cmd.match(/chnge code to var=(\d+)/);
  if (varMatch) {
    let varNum = parseInt(varMatch[1], 10);
    let commit = getCommitByVar(varNum);
    if (commit) {
      restoreCommit(commit);
      output =
        "Time-traveled to var:" +
        varNum +
        " (" +
        commit.date +
        ") — " +
        commit.label;
    } else {
      output =
        "No commit found at var:" +
        varNum +
        ". Max var is " +
        getCurrentVarNum();
    }
    return output;
  }

  // commit save
  if (cmd === "commit save" || cmd === "commit now") {
    let label = cmd === "commit now" ? "auto commit" : "manual commit";
    let commit = saveCommit(label);
    output = "Svd! var:" + commit.var + " | " + commit.date + " " + commit.time;
    return output;
  }

  // commit log
  if (cmd === "commit log") {
    output = showCommitLog();
    return output;
  }

  output =
    "Unknown command. Try:\n- chnge code to date=N\n- chnge code to var=N\n- commit save\n- commit now\n- commit log";
  return output;
}

// Handle command input
function handlePowerCommand() {
  let input = document.getElementById("power-input").value;
  if (!input.trim()) return;

  let result = runCommand(input);
  document.getElementById("power-output").textContent = result;
  document.getElementById("power-input").value = "";
}

// Auto-sv on page load (var:0 if first time)
function initPower() {
  let count = getCurrentVarNum();
  if (count === 0) {
    saveCommit("initial state");
  }
}
