// Temporarily simulate a logged-in user
const currentUser = localStorage.getItem("userEmail") || "testuser@example.com";
localStorage.setItem("userEmail", currentUser);

const feed = document.getElementById("feed");
const addPostBtn = document.getElementById("addPostBtn");

let posts = JSON.parse(localStorage.getItem("posts")) || [];


function renderPosts() {
  feed.innerHTML = "";  // Clear the feed

  // Loop through posts in their natural order (newest first because we add new posts to the start)
  posts.forEach((post, index) => {
    const postCard = document.createElement("div");
    postCard.className = "post-card";

    // Limiting to two comments initially
    const visibleComments = post.comments.slice(0, 2);
    const hiddenComments = post.comments.slice(2);

    postCard.innerHTML = `
      <div class="post-header">
        <div class="post-user-container">
          <div class="avatar">${getUserInitials(post.user)}</div>
          <div class="post-user-name-time">
            <span class="post-user">${post.user}</span>
            <span class="post-time">${new Date(post.time).toLocaleString()}</span>
          </div>
        </div>

        <div class="post-options-wrapper">
          <button class="dots-btn">⋯</button>
          <div class="post-menu hidden">
            <button class="edit-post" data-index="${index}">✏️ Edit</button>
            <button class="delete-post" data-index="${index}">🗑️ Delete</button>
          </div>
        </div>
      </div>

      <div class="post-body">${post.content}</div>
      ${post.image ? `<img src="${post.image}" class="post-image">` : ""}
      <div class="like-btn" onclick="likePost(${index})">❤️ ${post.likes} Like(s)</div>

      <div class="comment-box">
        <input type="text" placeholder="Add a comment..." onkeydown="addComment(event, ${index})"/>

        ${visibleComments.map(c => `<div class="comment"><b>${c.user}:</b> ${c.text}</div>`).join("")}

        ${hiddenComments.length > 0 ? 
          `<button class="view-more-btn" onclick="toggleComments(${index})">View More</button>` 
          : ""}

        <div class="hidden-comments-${index}" style="display: none;">
          ${hiddenComments.map(c => `<div class="comment"><b>${c.user}:</b> ${c.text}</div>`).join("")}
        </div>
      </div>
    `;

    // Append the post to the feed (in natural order)
    feed.appendChild(postCard);
  });
}



  


  document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const postCards = document.querySelectorAll(".post-card");
    const noResults = document.getElementById("noResults");
  
    let found = false;
  
    postCards.forEach(card => {
      const content = card.querySelector(".post-body").textContent.toLowerCase();
      const username = card.querySelector(".post-user").textContent.toLowerCase();
      const visible = content.includes(query) || username.includes(query);
      card.style.display = visible ? "block" : "none";
      if (visible) found = true;
    });
  
    // Toggle "no results" message
    noResults.style.display = found ? "none" : "block";
  });
  
  






// Add a post
document.getElementById("addPostBtn").addEventListener("click", function() {
  // Show the post form when the "+" button is clicked
  document.querySelector(".new-post").style.display = "block";
});

document.getElementById("submitPostBtn").addEventListener("click", function() {
  // Get the content and image from the form
  const content = document.getElementById("postText").value;
  const image = document.getElementById("postImage").files[0];

  // Create the new post object
  const newPost = {
    user: currentUser,  // Replace with dynamic user if needed
    time: Date.now(),
    content: content,
    image: image ? URL.createObjectURL(image) : null,  // Add image if available
    likes: 0,
    comments: []
  };



  // Add the new post at the beginning of the posts array
  posts.unshift(newPost);

  // Re-render the feed to display the new post
  renderPosts();

  // Hide the post form after submission
  document.querySelector(".new-post").style.display = "none";

  // Clear the input fields
  document.getElementById("postText").value = "";
  document.getElementById("postImage").value = "";
});






document.getElementById("cancelPostBtn").addEventListener("click", function() {
  // Hide the post form
  document.querySelector(".new-post").style.display = "none";

  // Clear the input fields
  document.getElementById("postText").value = "";
  document.getElementById("postImage").value = "";
});












// Like a post
function likePost(index) {
    posts[index].likes += 1;
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

// Add a comment
function addComment(event, index) {
    if (event.key === "Enter") {
        const text = event.target.value.trim();
        if (!text) return;

        posts[index].comments.push({ user: currentUser, text });
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
    }
}

// Delete a post
function deletePost(index) {
    if (confirm("Are you sure you want to delete this post?")) {
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
    }
}

// Load posts on start
renderPosts();

// Toggle 3-dot menu
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots-btn")) {
        const menu = e.target.nextElementSibling;
        menu.classList.toggle("hidden");
    } else {
        document.querySelectorAll(".post-menu").forEach(menu => {
            menu.classList.add("hidden");
        });
    }
});

// Delete from 3-dot menu
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-post")) {
        const index = e.target.dataset.index;
        if (confirm("Are you sure you want to delete this post?")) {
            posts.splice(index, 1);
            localStorage.setItem("posts", JSON.stringify(posts));
            renderPosts();
        }
    }
});

// Edit from 3-dot menu
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-post")) {
        const index = e.target.dataset.index;
        const newText = prompt("Edit your post:", posts[index].content);
        if (newText !== null) {
            posts[index].content = newText;
            localStorage.setItem("posts", JSON.stringify(posts));
            renderPosts();
        }
    }
});

function getUserInitials(email) {
    const name = email.split("@")[0];
    return name.slice(0, 2).toUpperCase();
}

function toggleComments(index) {
    const hiddenComments = document.querySelector(`.hidden-comments-${index}`);
    const viewMoreBtn = document.querySelector(`.view-more-btn`);

    hiddenComments.style.display = hiddenComments.style.display === "none" ? "block" : "none";
    viewMoreBtn.innerHTML = hiddenComments.style.display === "none" ? "View More" : "View Less";
}







































































