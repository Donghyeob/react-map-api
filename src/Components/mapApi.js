import React, { useEffect, useState } from 'react';

const { kakao } = window;

const MapApi = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const sizeHandler = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    let container = document.getElementById('kakaoMap');
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    let map = new kakao.maps.Map(container, options);
    let markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    let marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
    let mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, [])

  useEffect(() => {
    window.addEventListener('resize', sizeHandler);
    return () => {
      window.removeEventListener('resize', sizeHandler);
    }
  }, [])

  return (
    <div style={{ width: windowSize.width, height: windowSize.height }}>
      <div id="kakaoMap" style={{ width: "100%", height: "100%" }}></div>
    </div>
  )
}

export default MapApi;