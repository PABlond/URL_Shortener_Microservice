   
# API Project: URL Shortener Microservice
User story:
<ol>
          <li>I can POST a URL to <code>[project_url]/api/shorturl/new</code> and I will receive a shortened URL in the JSON response.<br>Example : <code>{"original_url":"https://github.com/PABlond","short_url":"http://fallacious-orange.glitch.me/api/shorturl/8968","id":8968}</code></li>
          <li>If I pass an invalid URL that doesn't follow the <code>http(s)://www.example.com(/more/routes)</code> format, the JSON response will contain an error like <code>{"error":"invalid URL"}</code></li>
          <li>When I visit the shortened URL, it will redirect me to my original link.</li>
        </ol>    

##Short URL Creation
*example: POST [project_url]/api/shorturl/new - https://www.google.com*

Example Usage:
http://fallacious-orange.glitch.me/api/shorturl/8968
Will Redirect to:
https://github.com/PABlond/

by PABlond
