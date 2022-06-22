"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  let checked = "checked";
  if (!currentUser.isFavorite(story)) {
    checked = "";
  }
  console.log(currentUser.isFavorite(story));
  console.log(story.title, checked)

  return $(`
      <li id="${story.storyId}"> 
      <input class="star hidden" type="checkbox" ${checked} id="" title="Add to favorite">
      <button class="deleteStory hidden" type="submit"  id="" title="Delete story">x</button>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
  // } else {
  //   return $(`
  //   <li id="${story.storyId}"> 
  //   <input class="star hidden" type="checkbox" id="" title="Add to favorite">
  //   <button class="deleteStory hidden" type="submit" id="" title="Delete story">x</button>
  //     <a href="${story.url}" target="a_blank" class="story-link">
  //       ${story.title}
  //     </a>
  //     <small class="story-hostname">(${hostName})</small>
  //     <small class="story-author">by ${story.author}</small>
  //     <small class="story-user">posted by ${story.username}</small>
  //   </li>
  // `);
  // }

}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
  if (currentUser) {
    $(".star").show(); //fiona when login, show the srat for check favorite
    $(".deleteStory").show();
  }
}

//when users submit the form, This function should get the data from the form, 
// call the .addStory method you wrote, and then put that new story on the page. 
// when users submit the form.
async function submitStoryForm() {
  const author = $("#newstory-author").val();
  const title = $("#newstory-title").val();
  const url = $("#newstory-url").val();
  const storyForm = { title, author, url };
  console.log(storyForm)
  const newStory = await storyList.addStory(currentUser, storyForm);
  const $story = generateStoryMarkup(newStory);
  $allStoriesList.append($story);

  $newstoryForm.hide();
  $newstoryForm.trigger("reset");
}
$("#newstory-form").on("submit", function (e) {
  e.preventDefault();
  submitStoryForm();
})
//"c618c874-5dce-4fcd-b4a7-68abf7091a1a"


/* when user clicks delete button, 
the story will be deleted from storylist and let api know its been deleted */
$allStoriesList.on("click", ".deleteStory", function () {
  const storyId = $(this).closest("li").attr("id");
  console.log(currentUser, storyId)
  storyList.deleteStory(currentUser, storyId);
})

/* when user clicks star, the story will be added to favorite list.  */
$allStoriesList.on("click", ".star", toggleStoryFavorite)

async function toggleStoryFavorite() {
  console.debug("toggleStoryFavorite");
  const favoriteStoryId = $(this).closest("li").attr("id");
  const favoriteStory = storyList.stories.find(s => s.storyId === favoriteStoryId);
  if (this.checked) {
    await currentUser.addFavorite(favoriteStory);
  } else {
    await currentUser.deleteFavorite(favoriteStory)
  }

}
//async function 


function putFavoriteStoriesOnPage() {
  console.debug("putFavoriteStoriesOnPage");

  $("#favorite-stories-list").empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $("#favorite-stories-list").append($story);
  }

  $("#favorite-stories-list").show();
}