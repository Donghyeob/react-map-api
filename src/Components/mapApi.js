import React, { useEffect, useState } from 'react';
import '../Css/mapApi.css';

const { kakao } = window;

const MapApi = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const [search, setSearch] = useState('');

  const onChangeSearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  }

  const sizeHandler = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    console.log(kakao.maps.services);
    const container = document.getElementById('kakaoMap');
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    let map = new kakao.maps.Map(container, options);
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // marker
    let markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    let marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);

    // control
    let mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // zoom
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    //search
    // 장소 검색 객체를 생성합니다
    let ps = new kakao.maps.services.Places();

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        let bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(search, placesSearchCB);

    // 지도에 마커를 표시하는 함수입니다
    const displayMarker = (place) => {

      // 마커를 생성하고 지도에 표시합니다
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }
  }, [windowSize.width, windowSize.height, search])

  useEffect(() => {
    window.addEventListener('resize', sizeHandler);
    return () => {
      window.removeEventListener('resize', sizeHandler);
    }
  }, [])

  return (
    <>
      <div className="map_wrap" style={{ width: windowSize.width, height: windowSize.height }}>
        <div id="kakaoMap" style={{ width: "100%", height: "100%" }}>
          <div style={{ position: 'absolute', top: '5px', left: '10px', zIndex: '2' }}>
            <input style={{ width: '160px', height: '17px', padding: '9px 12px 10px' }} onKeyPress={onChangeSearch} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MapApi;