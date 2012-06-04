
CPM = window.CPM || {};
CPM.extend = function(parent, child){
  parent[child] = parent[child] || {};
  return parent[child];
};

(function(parent){
  var EventLogger = CPM.extend(parent, "EventLogger");
  EventLogger.beaconUrl = EventLogger.beaconUrl || "http://localhost/beacon/images/beacon.gif";

  function sendBeacon(url){
    var b = new Image;
    b.src = url
  }

  function addQueryParam(url, key, value){
    var delimiter = url.indexOf("?") >= 0 ? "&" : "?"
    return url + delimiter + encodeURIComponent(key) + "=" + encodeURIComponent(value)
  }

  EventLogger.logEvent = function(event){
    if(!EventLogger.beaconUrl || !event){
      return;
    }

    event[".ver"] = 0;
    event[".ref"] = document.referrer;
    event[".loc"] = document.location;

    var query = "";
    for(attr in event){
      if(!event.hasOwnProperty(attr)){
        continue;
      }

      query = addQueryParam(query, attr, event[attr]);
    }

    var url = EventLogger.beaconUrl + query;
    sendBeacon(url);
  };

})(CPM);
