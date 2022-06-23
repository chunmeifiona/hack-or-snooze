"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/*Show submit form when click navbar link*///fiona
function navSubmitNewStory(evt) {
  console.log("navSubmitNewStory");
  hidePageComponents();
  $allStoriesList.show();
  $newstoryForm.show();
}
$navSubmitStory.on("click", navSubmitNewStory)

/**Show favorites when click navbar link *///fiona
function favoriteStories(evt) {
  console.debug("favoriteStories", evt);
  hidePageComponents();
  putFavoriteStoriesOnPage();
}
$("#nav-favorites").on("click", favoriteStories)

/**Show mystory when click navbar link *///fiona
function myStories(evt) {
  console.debug("myStories", evt);
  hidePageComponents();
  putMyStoriesOnPage();
}
$("#nav-mystories").on("click", myStories)

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $navbarMenu.show();//fiona
}
