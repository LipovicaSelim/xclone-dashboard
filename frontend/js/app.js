/*  ----------- Total accounts, tweets, likes and revenues ---------------------------*/

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`http://localhost:5000/totals/total-accounts`);
    const data = await response.json();
    const totalAccounts = data.totalAccounts;

    document.getElementById("totalAccounts").textContent = totalAccounts;
  } catch (error) {
    console.error("Error fetching total accounts: ", error);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`http://localhost:5000/totals/total-tweets`);
    const data = await response.json();
    const totalTweets = data.totalTweets;

    document.getElementById("totalTweets").textContent = totalTweets;
  } catch (error) {
    console.error("Error fetching total tweets: ", error);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`http://localhost:5000/totals/total-likes`);
    const data = await response.json();
    const totalLikes = data.totalLikes;

    document.getElementById("totalLikes").textContent = totalLikes;
  } catch (error) {
    console.error("Error fetching total likes: ", error);
  }
});

/* -----------------------------------------  Recent Accounts Section --------------------------------------------------  */

const legendTextContainer = document.querySelector(".legend-text p");
const recentAccountsContainer = document.getElementById("recent-accounts-ctn");

document.addEventListener("DOMContentLoaded", async () => {
  let activeEndpoint = "last-five-accounts";

  legendTextContainer.textContent = "Tim Sort Algorithm";

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

    legendTextContainer.textContent = "Tim Sort Algorithm";
    recentAccountsContainer.style.overflowY = "hidden";
    recentAccountsContainer.style.maxHeight = "none";

    await fetchDataAndRender(activeEndpoint);
  });
});

const toggleSortButton = document.querySelector("#sort-account-id");
let activeEndpointIds = "last-five-ids";

toggleSortButton.addEventListener("click", async () => {
  const fetchDataAndRenderIds = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:5000/totals/${endpoint}`);
      const data = await response.json();
      const tableBody = document.querySelector(".table tbody");
      tableBody.innerHTML = "";
      const recentAccountsContainer = document.getElementById(
        "recent-accounts-ctn"
      );
      recentAccountsContainer.style.overflowY = "hidden !important";

      legendTextContainer.textContent = "Merge Sort Algorithm";

      const accountsToRender = data.lastFiveAccounts;

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

  activeEndpointIds =
    activeEndpointIds === "last-five-ids" ? "first-five-ids" : "last-five-ids";
  await fetchDataAndRenderIds(activeEndpointIds);
});

document.addEventListener("DOMContentLoaded", () => {
  const recentAccountsContainer = document.getElementById(
    "recent-accounts-ctn"
  );
  const showAllButton = document.getElementById("show-all-accounts");

  let isShowAllActive = false;

  showAllButton.addEventListener("click", async (event) => {
    event.preventDefault();

    isShowAllActive = !isShowAllActive;

    console.log("show-all got clicked:");

    if (isShowAllActive) {
      recentAccountsContainer.style.maxHeight = "372px";
      recentAccountsContainer.style.overflowY = "scroll";
      showAllButton.textContent = "";
    } else {
      recentAccountsContainer.style.maxHeight = "none";
      recentAccountsContainer.style.overflow = "hidden";
      showAllButton.textContent = "Show all";
    }

    const populateTableWithAllAccounts = async () => {
      try {
        const responseAllAccounts = await fetch(
          `http://localhost:5000/totals/show-all-accounts`
        );
        const { allAccounts } = await responseAllAccounts.json();

        const tableBody = document.querySelector(".table tbody");
        tableBody.innerHTML = "";

        allAccounts.forEach((account) => {
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
      } catch (error) {
        console.error("Error fetching all accounts: ", error);
      }
    };

    await populateTableWithAllAccounts();
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
