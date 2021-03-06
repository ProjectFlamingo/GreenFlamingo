import config from '../../../../config/config';

export const LOADING_LOCATION = "LOADING_LOCATION";
export function loadingLocation() {
  return {
    type: LOADING_LOCATION,
  };
}

export const LOADING_LOCATION_SUCCESS = "LOADING_LOCATION_SUCCESS";
export function loadingLocationSuccess(location) {
  return {
    type: LOADING_LOCATION_SUCCESS,
    payload: location,
  };
}

export const LOADING_LOCATION_FAILED = "LOADING_LOCATION_FAILED";
export function loadingLocationFailed() {
  return {
    type: LOADING_LOCATION_FAILED,
  };
}

export const CLEAR_LOCATION = "CLEAR_LOCATION";
export function clearLocation() {
  return {
    type: CLEAR_LOCATION,
  };
}

export function loadLocation(id){
  return function(dispatch){
    dispatch(clearLocation());

    dispatch(loadingLocation());
    fetch(config.host + "/locations/"+id)
      .then(res => {
        if(res.ok){
          res.json()
            .then(json => {
              dispatch(loadingLocationSuccess(json));
            });
        }else{
          dispatch(loadingLocationFailed(res.body));
        }
      });
  };
}
