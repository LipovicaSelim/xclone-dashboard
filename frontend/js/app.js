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
  let activeEndpoint = "last-five-accounts";

  const fetchDataAndRender = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:5000/totals/${endpoint}`);
      const data = await response.json();

      const tableBody = document.querySelector(".table tbody");
      tableBody.innerHTML = "";

      const accountsToRender =
        data[
          `${endpoint === "last-five-accounts" ? "last" : "first"}FiveAccounts`
        ];

      if (accountsToRender) {
        accountsToRender.forEach((account) => {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td><input class="form-check-input" type="checkbox"></td>
            <td>${account.date}</td>
            <td>${account.name}</td>
            <td>${account.id}</td>
            <td>${account.tweets}</td>
            <td>${account.status}</td>
            <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
          `;
          tableBody.appendChild(newRow);
        });
      } else {
        console.error(`Error: ${endpoint}`);
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint} accounts: `, error);
    }
  };

  await fetchDataAndRender(activeEndpoint);

  const toggleSortButton = document.querySelector(".fa-sort");
  toggleSortButton.addEventListener("click", async () => {
    activeEndpoint =
      activeEndpoint === "last-five-accounts"
        ? "first-five-accounts"
        : "last-five-accounts";

    await fetchDataAndRender(activeEndpoint);
  });
});

/*  ------------------- RECENT TWEETS SECTION --------------------------------------- */

document.addEventListener("DOMContentLoaded", async () => {
  const populateTableWithTweets = async () => {
    try {
      const responseLastFiveTweets = await fetch(
        `http://localhost:5000/totals/last-five-tweets`
      );
      const dataLastFiveTweets = await responseLastFiveTweets.json();

      const tableBody = document.getElementById("tweetsTableBody");
      tableBody.innerHTML = "";

      dataLastFiveTweets.lastFiveTweets.forEach((tweet) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td><input class="form-check-input" type="checkbox"></td>
          <td>${tweet.date}</td>
          <td>${tweet.id}</td>
          <td>${tweet.likes_count}</td>
          <td>${tweet.comments_count}</td>
          <td>${tweet.retweets_count}</td>
          <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
        `;
        tableBody.appendChild(newRow);
      });
    } catch (error) {
      console.error("Error fetching last five tweets: ", error);
    }
  };
  await populateTableWithTweets();
});
