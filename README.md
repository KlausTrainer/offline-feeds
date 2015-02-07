My "sample app" for the couchDB Day. Couldn't finisch it in time but @svenlito helped me out after the talk! This have should become a feedreader of some sorts. But it didn't worked out. Nevertheless it was fun playing and learnd a lot.

In this setup you need a local couchDB running with some docs like this:

```js
{
   "_id": "http://cabinporn.com/post/105012311690",
   "_rev": "6-780e8418758ff671db7af1f8ed21cd36",
   "title": "Handmade cabin built with recycled insulated freezer panels, on...",
   "postedTime": "Fri, 12 Dec 2014 11:01:07 -0500",
   "type": "Activity Stream",
   "verb": "post",
   "object": {
       "id": "http://cabinporn.com/post/105012311690",
       "link": "http://cabinporn.com/post/105012311690",
       "summary": "<img src=\"http://40.media.tumblr.com/c50fc483904dd4abf6e60a689b64590f/tumblr_ngghwrFKuw1qzwmsso1_1280.jpg\"/><br/><br/><p>Handmade cabin built with recycled insulated freezer panels, on <strong>Vancouver island, British Columbia Canada</strong>.</p><p>Contributed by Gabrielle Eva.</p>",
       "objectType": "article"
   },
   "actor": {
       "link": "",
       "name": "",
       "objectType": "author"
   },
   "provider": {
       "id": "http://freecabinporn.com/rss",
       "name": "Cabin Porn™",
       "objectType": "service"
   },
   "_attachments": {
       "31143406": {
           "content_type": "image/jpeg",
           "revpos": 3,
           "digest": "md5-Kk2G3ORlCcDWarSfA7bQAw==",
           "length": 38649,
           "stub": true
       }
   }
}
```

There are files for appCache and service workers.
Feel free to ask what they mean and especially to send your fixes.

To enable the the `serviceWorker` to connect to your couchDB consider running this (the referer header is the important part):

```
HOST=http://adminname:password@localhost:5984 # or whatever you got
curl -X POST $HOST/_config/httpd/enable_cors -d '"true"'
curl -X PUT $HOST/_config/cors/origins -d '"*"'
curl -X PUT $HOST/_config/cors/credentials -d '"true"'
curl -X PUT $HOST/_config/cors/methods -d '"GET, PUT, POST, HEAD, DELETE"'
curl -X PUT $HOST/_config/cors/headers -d '"accept, authorization, content-type, origin, referer"'
```

Stolen and patched from https://github.com/nolanlawson/pouchdb-authentication
