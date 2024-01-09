document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`http://localhost:5000/totals/total-accounts`);
    const data = await response.json();
    console.log("Total accounts: ", data);

    document.getElementById("totalAccounts").textContent = data.totalAccounts;
  } catch (error) {
    console.error("Error fetching total accounts: ", error);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`http://localhost:5000/totals/total-tweets`);
    const data = await response.json();
    console.log("Total tweets: ", data);

    document.getElementById("totalTweets").textContent = data.totalTweets;
  } catch (error) {
    console.error("Error fetching total tweets: ", error);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`http://localhost:5000/totals/total-likes`);
    const data = await response.json();
    console.log("Total likes: ", data);

    document.getElementById("totalLikes").textContent = data.totalLikes;
  } catch (error) {
    console.error("Error fetching total likes: ", error);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const responseLastFiveAccounts = await fetch(
      `http://localhost:5000/totals/last-five-accounts`
    );
    const dataLastFiveAccounts = await responseLastFiveAccounts.json();

    const tableBody = document.querySelector(".table tbody");

    tableBody.innerHTML = "";

    dataLastFiveAccounts.lastFiveAccounts.forEach((account) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
                <td><input class="form-check-input" type="checkbox"></td>
                <td>${account.date}</td>
                <td>${account.name}</td>
                <td>${account.id}</td>
                <td>${account.tweets}</td>
                <td>Status</td>
                <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
            `;
      tableBody.appendChild(newRow);
    });
  } catch (error) {
    console.error("Error fetching last five accounts: ", error);
  }
});
