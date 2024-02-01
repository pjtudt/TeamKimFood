import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { DropdownSubmenu, NavDropdownMenu} from "react-bootstrap-submenu";
import { SlLogin, SlPencil  } from "react-icons/sl";
import '../Css/Common.css';
import React, { useState, useEffect } from 'react';
import { KAKAO_AUTH_URL } from '../OAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function TopNav() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isAdmin, setIsAdmin] = useState(false);
const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);

   const handleLogin = (loginCredentials) => {
      axios.post('/login', loginCredentials)
        .then(response => {
          localStorage.setItem('token', response.data.token);
          setIsLoggedIn(true);
          setIsAdmin(response.data.isAdmin === 'true'); // 여기서 관리자 여부 설정
        })
        .catch(error => {
          console.log('에러 발생');
        });
    };
0
    const handleLogout = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setIsAdmin(false);
    };

   const handleAdminOrMyPageClick = () => {
       if (isAdmin) {
           navigate('/admin');
       } else {
           navigate('/mypage');
       }
   };




    return (
        <header>
            <div className="hd_top">
                <span className="logo"><a href="/">YoriJori</a></span>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button className="btn_regular" variant="outline-success">Search</Button>
                </Form>
                <ul className="signInUp">
                           {!isLoggedIn && (
                                      <>
                                          <li><a href="/signin"><SlPencil /> 회원가입</a></li>
                                          <li><a href="/login"><SlLogin /> 로그인</a></li>

                                      </>
                                  )}

                                 {isLoggedIn && isAdmin && (
                                       <li><a onClick={handleAdminOrMyPageClick}>
                                       {isAdmin ? '관리자 페이지' : '마이 페이지'}</a></li>
                                   )}

                                  {isLoggedIn && (
                                      <li><a href="/" onClick={handleLogout}><SlLogin /> 로그아웃</a></li>
                                  )}
                              </ul>
            </div>

            <Navbar expand="lg" className="bg-body-navbar">
                <Container fluid="true" id="contNav">

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="navbar-text"
                            style={{maxHeight: '100px'}}
                            navbarScroll>


                            <NavDropdown title="카테고리" id="navbarScrollingDropdown" className="menulist">
                                <NavDropdown.Item href="#action1">종류별
                                    밑반찬 | 메인반찬 | 국/탕/찌개 | 디저트 | 면상황별/만두 | 밥/죽/떡 | 퓨전 | 김치/젓갈 | 장류/양념/소스/잼 | 양식 | 샐러드 | 스프 | 빵/과자 | 차/음료/술 | 기타</NavDropdown.Item>
                                <NavDropdown.Item href="#action2">상황별</NavDropdown.Item>
                                <NavDropdown.Item href="#action3">재료별</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#action4" className="menulist">오늘의 요리</Nav.Link>
                            <Nav.Link href="#action5" className="menulist">인기 레시피</Nav.Link>
                            <Nav.Link href="#action6" className="menulist">매거진</Nav.Link>

                            {/*<ul className="nav-category">*/}
                            {/*    <li className="nav-category-item">종류별   밑반찬 | 메인반찬 | 국/탕/찌개 | 디저트 | 면/만두 | 밥/죽/떡 | 퓨전 | 김치/젓갈 | 장류/양념/소스/잼 | 양식 | 샐러드 | 스프 | 빵/과자 | 차/음료/술 | 기타</li>*/}
                            {/*    <li className="nav-category-item">상황별</li>*/}
                            {/*    <li className="nav-category-item">재료별</li>*/}
                            {/*</ul>*/}
                            {/*</Nav.Link>*/}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    );
}

export default TopNav;