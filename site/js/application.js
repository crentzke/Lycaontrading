google.load("gdata", "2.0");

function initialize() {
  var content = document.getElementById('posts');
  if (content != undefined) {
    var bloggerService = new google.gdata.blogger.BloggerService('com.appspot.interactivesampler');
    var feedUri = 'http://lycaonfutures.blogspot.com/feeds/posts/default';

    // A callback method invoked getBlogPostFeed() returns data
    var handleBlogPostFeed = function(postsFeedRoot) {
      var posts = postsFeedRoot.feed.getEntries();
      console.log(posts);
      var html = '';
      for (var i = 0, post; post = posts[i]; i++) {
        var postTitle = post.getTitle().getText();
        var postPublished = new Date(post.getPublished().$t).toDateString()
        var postComments = post.getRepliesHtmlLink()
        var postAuthor = post.getAuthors()[0].name.$t
        var postURL = post.getHtmlLink().getHref();

        if(i == 0) {
         var postContent= (post.getContent().getText());
        } else {
          var postContent= strip(post.getContent().getText())
          postContent = postContent.trunc(200, true)
        }
        html += '<div><h3><a href="' + postURL + '" target="_blank">'
                  + postTitle
                  + '</a></h3>'
                  + postContent
                  + '<div>Posted by '
                  + postAuthor
                  + ' on ' + postPublished + ' '
                  +  '<a href="' + postComments.href + '">' + postComments.title + '</a>'
                  + '</div>'
                  + '</div>';
      }
      content.innerHTML = html;
      $('#posts span').removeAttr('style')
    };

    var handleError = function(error) {
      content.innerHTML = '<pre>' + error + '</pre>';
    };
    bloggerService.getBlogPostFeed(feedUri, handleBlogPostFeed, handleError);
  }
}

// EXTRAS
function strip(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

String.prototype.trunc =
     function(n,useWordBoundary){
         var toLong = this.length>n,
             s_ = toLong ? this.substr(0,n-1) : this;
         s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
         return  toLong ? s_ +'...' : s_;
      };


//Start er up...
google.setOnLoadCallback(initialize);