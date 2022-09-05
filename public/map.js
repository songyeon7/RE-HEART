import mapJson from '/files/data.json' assert {type: 'json'};

const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.542268, 126.967049), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성합니다    
const map = new kakao.maps.Map(mapContainer, mapOption);

//json 파싱
const mydata = mapJson.data

const onchecked = false

const addressArray = new Array; //주소지 배열생성
const contentArray = new Array; //마커 내용 배열생성

// 주소-좌표 변환 객체를 생성합니다
//var geocoder = new kakao.maps.services.Geocoder();    

//현재 위치 기반 검색
function success({ coords, timestamp }) {
    const latitude = coords.latitude;   // 위도
    const longitude = coords.longitude; // 경도
    alert(`위도: ${latitude}, 경도: ${longitude}, 위치 반환 시간: ${timestamp}`);
    for (let i = 0; i < 5000; i++) {
        const tmplat = latitude - mydata[i].wgs84lat
        const tmplong = longitude - mydata[i].wgs84lon
        if (tmplong < 0) {
            tmplong * -1;
        }
        if (tmplat < 0) {
            tmplat * -1;
        }
        tmpser = tmplat + tmplong

        if (onchecked == true) {
            setMarkers(null)
        }
        if (tmpser < 20) {
            const markerPosition = new kakao.maps.LatLng(mydata[i].wgs84lat, mydata[i].wgs84lon);
            onchecked = true
            // 마커를 생성합니다
            const marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: markerPosition, // 마커를 표시할 위치
                title: mydata[i].buildplace, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                //image : markerImage // 마커 이미지 
            });
        }
    }
}

function getUserLocation() {
    if (!navigator.geolocation) {
        throw "위치 정보가 지원되지 않습니다.";
    }
    navigator.geolocation.getCurrentPosition(success);
}

//위치 이름 기반 검색
function search() {
    //clusterer.clear();

    for (let i = 0; i < 5000; i++) {

        const stringVal = mydata[i].buildaddress, substring = document.getElementById("tbox").value;
        if (stringVal.indexOf(substring) !== -1) {
            const markerPosition = new kakao.maps.LatLng(mydata[i].wgs84lat, mydata[i].wgs84lon);
            // 마커를 생성합니다
            const marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: markerPosition, // 마커를 표시할 위치
                title: mydata[i].buildplace, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                //image : markerImage // 마커 이미지 
            });
        }

    }
}

function render() {
    const searchButton = document.querySelector("#searchButton")
    searchButton.addEventListener('click', search)

    getUserLocation();
}

window.onload = render