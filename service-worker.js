// DIDNT INCLUDE IMGS IN ASSETS BECAUSS EVERY BROWSER HAS A CACHE LIMIT (50-250MB) 
const APP_PREFIX = "FoodFest-";
const VERSION = "version01";
const CACHE_NAME = APP_PREFIX + VERSION;
// again must be relative paths
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];

// we cant use window.addEvent... because service workers run before the window obj is created, so we use self instead.
self.addEventListener("install", function (event) {
    // wait until
    event.waitUntil(
        // find cache by name and then 
        caches.open(CACHE_NAME).then(function (cache) {
            // add all every file in the FILES_TO_CACHE array to the cache
            console.log("installing cache : " + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        // .keys() represents all the cache names, which were calling keyList
        caches.keys().then(function(keyList) {
            // because we may have many sites hosted under the same URL, so we filter out the ones who have the APP_PREFIX
            let cacheKeeplist = keyList.filter(function(key) {
                return key.indexOf(APP_PREFIX)
            })
            // add current Cache to the keep list
            cacheKeeplist.push(CACHE_NAME);
            
            // returns a promise that will not resolve until
            return Promise.all(keyList.map(function(key, i) {
                // all old versions of the cache are deleted
                if (cacheKeeplist.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    );
});

// THE APPLICATION DOESNT KNOW HOW TO RETRIEVE INFO FROM THE CACHE NEEDS THIS
// on fetch 
self.addEventListener('fetch', function(event) {
    console.log('fetch request : ' + event.request.url)
    // ev
    event.respondWith(
        // check to see if the request is already stored in the cache or not
        caches.match(event.request).then(function (request) {
            // if the request is in the cache
            if (request) {
                // return request directly from cacbe
                console.log('responding with cache : ' + event.request.url);
                return request
            } else {
                console.log('file is not cached, fetching : ' + event.request.url);
                // if file not cached, it will make a normal fetch request
                return fetch(event.request)
            }

            // You can omit if/else for console.log & put one line below like this too.

            // return request || fetch(event.request)
        })
    )
})