import React from 'react';
import axios from 'axios';

import {useNavigate} from 'react-router-dom';

function LoginHandler(){
     const navigate = useNavigate();
     const handleKakaoLogin = async () => {
          try {
            const code = new URL(window.location.href).searchParams.get('code');
            console.log("code??: ", code)
            const backendUrl = 'http://localhost:8080';
            const params = new URLSearchParams();
            params.append('code',code);

            console.log("param.code", code)

            const res = await axios({
              method: 'POST',
              url: `${backendUrl}/public/auth/kakao/callback`,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: params.toString()
            });
            console.log('Response', res);
             //성공적으로 로그인이 됐는지 확인
            if (res.status === 200 && res.data.success) {
             localStorage.setItem('accessToken',res.data.accessToken);
             localStorage.setItem('userInfo',res.data.userInfo);
              navigate('/boardlist');
            }else {
                 console.error('로그인 실패');
             }
             }
             } catch (error) {
                 console.error('로그인 에러', error);
                 if (error.response && error.response.status === 401) {
                     console.log('응답 에러: ', error.response.status);
                 } else {
                     console.log('문제 발생');
                 }
                 // 에러 처리 로직
             };

        return (
          <div className="LoginHandler">
          <div className="notice">
          <p>로그인 처리 중...</p>
          </div>
          </div>
        );
      }
    }

export default LoginHandler;

