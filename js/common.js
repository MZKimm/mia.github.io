/* 화면 스크롤 됐을 때 헤더에 scrolled 클래스 추가/제거 */

window.addEventListener('scroll', ()=>{
    let scroll = document.querySelector('html').scrollTop
    if(scroll > 100){
        document.querySelector('.header_top').classList.add('scrolled')
    }
    else{
        document.querySelector('.header_top').classList.remove('scrolled')
    }
})


/* 소개 화면의 skills에서 나오는 막대그래프 애니메이션 */
let gauge = document.querySelectorAll('.gauge')
gauge.forEach((item, i)=> {
    console.log(item, i)

    gsap.to(item, {
        scale:1,
        duration: 1,
        delay: i * 0.25,
        scrollTrigger: {
            trigger: '.skill_list',
            start: 'top 75%',
            end: 'bottom 25%',
            markers: true
        }
    })
})

/* gallery 슬라이드(swiper) */
var swiper = new Swiper(".swiper", {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoHeight: true,
    //effect: "fade",
    autoplay: {
      delay: 30000,
      disableOnInteraction: false,
    },
    breakpoints: {
        720: {
          slidesPerView: 3,
          spaceBetween: '7%',
        }
        
      },
  });


/* 포트폴리오 데이터 */
let portfolioData = [
    {
        subject : '포트폴리오 1번',
        tags : '#반응형웹 #2주작업 #웹접근성준수 #기타등등 #기타등등 #기타등등 #기타등등',
        imgSrc :['./img/portfolio01.jpg','./img/portfolio01.jpg','./img/portfolio01.jpg'],
        desc : '처음 퍼블리싱 배우며 공부하면서 만들었던 조금 모자란 칭구입니다.'
    },
    {
        subject : '포트폴리오 2번',
        tags : '#반응형웹 #2주작업 #웹접근성준수 #기타등등 #기타등등 #기타등등 #기타등등',
        imgSrc :['./img/portfolio02.jpg','./img/portfolio02.jpg','./img/portfolio02.jpg'],
        desc : '처음 퍼블리싱 배우며 공부하면서 만들었던 조금 모자란 칭구입니다.'
    },
    {
        subject : '포트폴리오 3번',
        tags : '#반응형웹 #2주작업 #웹접근성준수 #기타등등 #기타등등 #기타등등 #기타등등',
        imgSrc : './img/portfolio03.jpg',
        desc : '처음 퍼블리싱 배우며 공부하면서 만들었던 조금 모자란 칭구입니다.'
    },
    {
        subject : '포트폴리오 4번',
        tags : '#반응형웹 #2주작업 #웹접근성준수 #기타등등 #기타등등 #기타등등 #기타등등',
        imgSrc : './img/portfolio04.jpg',
        desc : '처음 퍼블리싱 배우며 공부하면서 만들었던 조금 모자란 칭구입니다.'
    },
    {
        subject : '포트폴리오 5번',
        tags : '#반응형웹 #2주작업 #웹접근성준수 #기타등등 #기타등등 #기타등등 #기타등등',
        imgSrc : './img/portfolio05.jpg',
        desc : '처음 퍼블리싱 배우며 공부하면서 만들었던 조금 모자란 칭구입니다.'
    },
   {
    subject : '포트폴리오 6번',
    tags : '#반응형웹 #2주작업 #웹접근성준수 #기타등등 #기타등등 #기타등등 #기타등등',
    imgSrc : './img/portfolio06.jpg',
    desc : '처음 퍼블리싱 배우며 공부하면서 만들었던 조금 모자란 칭구입니다.'
   }
]


/* 포트폴리오 리스트 생성하기 */
portfolioData.forEach((data)=>{

    let img
    if(Array.isArray(data.imgSrc)) { //배열일 경우
        img = data.imgSrc[0]
    }
    else { //배열이 아닐 경우
        img = data.imgSrc
    }

    let html = 
    `<li>
        <a href="">
            <div class="txt">
                <strong>${data.subject}</strong>
                <p>${data.tags}</p>
            </div>
            <img src="${img}" alt="">
        </a>
    </li>`
    document.querySelector('.portfolio_list').insertAdjacentHTML('beforeend',html)
}) 

/*  포트폴리오 클릭할 때 팝업 데이터 바인딩하기  */
let links = document.querySelectorAll('.portfolio_list a')

let popup = document.querySelector('.portfolio_pop') //('popup'으로 간소화 명명해주는 것)

links.forEach((item, index)=>{
    item.addEventListener('click',(e)=>{
        e.preventDefault() //기본 동작 막기

        popup.style.display='block'
        // = (popup으로 명명해주는 것) document.querySelector('.portfolio_pop').style.display='block'
        document.querySelector('body').classList.add('non_scroll')

        
        // 클릭한 li의 index를 가져온다
        console.log('index', index)

        // portfolioData[index].subject 데이터를 팝업의 h1태그에 바인딩한다.
        popup.querySelector('h1').innerHTML=portfolioData[index].subject
        
        // portfolioData[index].desc 데이터를 팝업의 p태그에 바인딩한다.
        popup.querySelector('p').innerHTML=portfolioData[index].desc

        popup.querySelector('.img_wrap').innerHTML=''

        // portfolioData[index].imgSrc 데이터를 팝업의 img태그에 속성으로 넣어준다.
        if(Array.isArray(portfolioData[index].imgSrc)){
            // 배열일 경우 반복할 내용
            portfolioData[index].imgSrc.forEach((data)=>{
                let html = `<img src="${data}" alt="">`
                popup.querySelector('.img_wrap').insertAdjacentHTML('beforeend', html)
            })
        }else {
            let html = `<img src="${portfolioData[index].imgSrc}" alt="">`
                popup.querySelector('.img_wrap').insertAdjacentHTML('beforebegin', html)
        }
    })
})


/* 포트폴리오 팝업창의 닫기 버튼 */
document.querySelector('.portfolio_pop button').addEventListener('click', ()=>{
    popup.style.display='none'
    document.querySelector('body').classList.remove('non_scroll')
})


/* emailjs */
document.querySelector('.contact button[type=submit]').addEventListener('click',(e)=>{

    e.preventDefault()

    // 이름을 입력하세요
    //
    // alert (메시지를 입력하세요)
    if(document.querySelector('input[name=name]').value==''){
        alert('이름을 입력해주세요')
    }
    else if(document.querySelector('input[name=tel]').value==''){
        alert('전화번호를 입력해주세요')
    }
    else if(document.querySelector('input[name=email]').value==''){
        alert('이메일을 입력해주세요')
    }
    else if(document.querySelector('input[name=message]').value==''){
        alert('내용을 입력해주세요')
    }
    else{
        
        emailjs.init("HszsnxuiIKXZd5-N-");

        /* emailjs.sendForm('service_xf408mn', 'template_bo39tue', '#myForm').then(
            (response) => {
                console.log('SUCCESS!', response.status, response.text);
            },
            (error) => {
                console.log('FAILED...', error);
            }
        ); */
        emailjs.sendForm('service_xf408mn', 'template_bo39tue', '#myForm').
        then(function(response) {
            alert('메일이 전송되었습니다.')
            document.querySelector('input[name=name]').value=''
            document.querySelector('input[name=tel]').value=''
            document.querySelector('input[name=email]').value=''
            document.querySelector('input[name=message]').value=''
            console.log('SUCCESS!', response.status, response.text);
            },
            (error) => {
                console.log('FAILED...', error);
            }
        );
    }
})


/* 메뉴를 누를 때 해당하는 섹션으로 부드럽게 이동 */

let navLinks = document.querySelectorAll('.gnb a')
navLinks.forEach((link)=>{
    link.addEventListener('click',e =>{
        e.preventDefault() // 기본 기능 막기

        // .gnb 에 opened 클래스 없애기 -> 메뉴 닫기
        document.querySelector('.gnb').classList.remove('opened')
        document.querySelector('body').classList.remove('non_scroll')

        // 클릭한 메뉴 색 넣어주기
        navLinks.forEach((link)=> link.classList.remove('active'))
        link.classList.add('active')

        // 선택한 섹션으로 부드럽게 이동
        let targetID = link.getAttribute('href') // #introduce. 내가 클릭한 a태그의 값이 들어옴
        let targetSection= document.querySelector(targetID) // 내가 이동해야 할 섹션 선택(클릭한 대상)

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        })

    })
})

/* 로고를 클릭했을 때 제일 위로 부드럽게 이동 */
let logo = document.querySelector('.logo a')

logo.addEventListener('click',e =>{
        e.preventDefault() // 기본 기능 막기

        // 클릭한 메뉴 색 넣어주기
        navLinks.forEach((link)=> link.classList.remove('active'))

        // 선택한 섹션으로 부드럽게 이동
        let targetID = logo.getAttribute('href') // #introduce. 내가 클릭한 a태그의 값이 들어옴
        let targetSection= document.querySelector(targetID) // 내가 이동해야 할 섹션 선택(클릭한 대상)

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        })
    })



/* 스크롤 하다가 보여지는 섹션 메뉴에 표시 */
window.addEventListener('scroll', ()=>{

    navLinks.forEach((link)=>{
        let section = document.querySelector(link.getAttribute('href'))
        let sectionTop/* = 포트폴리오 내용의 Y값 */= section.offsetTop - 300
        let sectionBottom= sectionTop + section.clientHeight
        let currentSection = link.getAttribute('href')

        link.classList.remove('active')

        if(window.scrollY >= sectionTop && window.scrollY < sectionBottom){
            /* console.log('갤러리 나와따!') */ //섹션 수치에 따라 잘 나타나는지 확인
            document.querySelector(`.gnb a[href="${currentSection}"]`).classList.add('active')
        }

    })
    
    //console.log(currentSection)
    //console.log(window.scrollY, sectionTop, sectionBottom)
})

/* 모바일에서 메뉴버튼 열고 닫기 */
document.querySelector('.btn_open').addEventListener('click',()=>{
    document.querySelector('.gnb').classList.add('opened')
    document.querySelector('body').classList.add('non_scroll')
})
document.querySelector('.btn_close').addEventListener('click',()=>{
    document.querySelector('.gnb').classList.remove('opened')
    document.querySelector('body').classList.remove('non_scroll')    
})