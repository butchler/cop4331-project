function getStory(difficulty) {
    var stories = parseJSON("Content/Story/story.json");
    
    return stories.storylines[difficulty - 1];
}