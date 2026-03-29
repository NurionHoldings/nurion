[배치 방법]
1) 프로젝트 루트에 dept/ 폴더를 만들고, 이 폴더의 사업부 html 5개와 공통 자료실 resources.html 을 복사하세요.
2) 대표 이미지 경로:
   - 각 페이지의 hero 이미지는 ../assets/placeholders/*.jpg 를 참조합니다.
   - 실제 이미지를 사용하려면 동일 경로에 파일을 두거나, img src를 바꿔주세요.

[추천 placeholder 파일]
/assets/placeholders/consulting-hero.jpg
/assets/placeholders/news-hero.jpg
/assets/placeholders/edocs-hero.jpg
/assets/placeholders/software-hero.jpg
/assets/placeholders/solar-hero.jpg (또는 dept/solar-hero-nurion.svg 사용)
/assets/placeholders/process.jpg

이미지가 없어도 페이지는 깨지지 않도록 onerror fallback을 넣어두었습니다.
