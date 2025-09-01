import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./SignupPage.css";

export default function SignUpPage() {
    const [form, setForm] = useState({
        username: "",
        name: "",
        password: "",
        passwordConfirm: "",
        email: "",
        birthYear: "",
        birthMonth: "",
        birthDay: "",
        agreeAll: false,
        agreeTerms: false,   // (필수) 이용약관/개인정보
        agreeAge14: false,   // (필수) 만 14세 이상
        agreeMarketing: false, // (선택) 마케팅 수신
    });

    const [errors, setErrors] = useState({});

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;

        // 개별 체크박스 처리
        if (type === "checkbox" && name !== "agreeAll") {
            const next = { ...form, [name]: checked };
            // 모두 체크됐는지에 따라 agreeAll 동기화
            const allChecked = next.agreeTerms && next.agreeAge14 && next.agreeMarketing;
            setForm({ ...next, agreeAll: allChecked });
            return;
        }

        // 전체 동의
        if (name === "agreeAll") {
            setForm({
                ...form,
                agreeAll: checked,
                agreeTerms: checked,
                agreeAge14: checked,
                agreeMarketing: checked,
            });
            return;
        }

        setForm({ ...form, [name]: value });
    };

    const validate = () => {
        const e = {};
        if (!form.username.trim()) e.username = "아이디를 입력하세요.";
        if (!form.name.trim()) e.name = "이름을 입력하세요.";
        if (!form.password || form.password.length < 6) e.password = "비밀번호는 6자 이상이어야 해요.";
        if (form.password !== form.passwordConfirm) e.passwordConfirm = "비밀번호가 일치하지 않습니다.";
        if (!form.email.trim()) e.email = "이메일을 입력하세요.";
        if (!form.birthYear || !form.birthMonth || !form.birthDay) {
            e.birth = "생년월일을 모두 선택하세요.";}
        if (!form.agreeTerms) e.agreeTerms = "필수 약관에 동의해야 가입할 수 있습니다.";
        if (!form.agreeAge14) e.agreeAge14 = "만 14세 이상에 동의해야 가입할 수 있습니다.";
        return e;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const eMap = validate();
        setErrors(eMap);
        if (Object.keys(eMap).length) return;

        // 실제 API 연동 자리
        const payload = {
            username: form.username,
            name: form.name,
            password: form.password,
            email: form.email,
            birth: `${form.birthYear}-${form.birthMonth}-${form.birthDay}`,
            agree: {
                terms: form.agreeTerms,
                age14: form.agreeAge14,
                marketing: form.agreeMarketing,
            },
        };
        console.log("SIGNUP_PAYLOAD", payload);
        alert("가입 정보가 제출되었습니다. (mock)");
    };

    return (
        <>
            <Header />

            <div className="container">
                <main className="signup-main">
                    <div className="signup-container">
                        <h1>회원가입</h1>

                        <form onSubmit={onSubmit} noValidate>
                            {/* 아이디 */}
                            <label htmlFor="username">아이디 ⁕</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="아이디를 입력하세요."
                                value={form.username}
                                onChange={onChange}
                                aria-invalid={!!errors.username}
                                aria-describedby={errors.username ? "err-username" : undefined}
                            />
                            {errors.username && <p className="form-error" id="err-username">{errors.username}</p>}

                            {/* 이름 */}
                            <label htmlFor="name">이름 ⁕</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="이름을 입력하세요."
                                value={form.name}
                                onChange={onChange}
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? "err-name" : undefined}
                            />
                            {errors.name && <p className="form-error" id="err-name">{errors.name}</p>}

                            {/* 비밀번호 */}
                            <label htmlFor="password">비밀번호 ⁕</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="6자 이상 입력하세요."
                                value={form.password}
                                onChange={onChange}
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? "err-password" : undefined}
                            />
                            {errors.password && <p className="form-error" id="err-password">{errors.password}</p>}

                            {/* 비밀번호 확인 */}
                            <label htmlFor="passwordConfirm">비밀번호 확인 ⁕</label>
                            <input
                                id="passwordConfirm"
                                name="passwordConfirm"
                                type="password"
                                value={form.passwordConfirm}
                                onChange={onChange}
                                aria-invalid={!!errors.passwordConfirm}
                                aria-describedby={errors.passwordConfirm ? "err-passwordConfirm" : undefined}
                            />
                            {errors.passwordConfirm && (
                                <p className="form-error" id="err-passwordConfirm">{errors.passwordConfirm}</p>
                            )}

                            {/* 이메일 */}
                            <label htmlFor="email">이메일 ⁕</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={onChange}
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "err-email" : undefined}
                            />
                            {errors.email && <p className="form-error" id="err-email">{errors.email}</p>}

                            {/* 생년월일 */}
                             <label htmlFor="birth">생년월일 ⁕</label>
                             <div className="birth-box">
                               <select
                                 name="birthYear"
                                 value={form.birthYear}
                                 onChange={onChange}
                               >
                                 <option value="">년도</option>
                                 {Array.from({ length: 100 }, (_, i) => {
                                   const year = new Date().getFullYear() - i;
                                   return (
                                     <option key={year} value={year}>
                                       {year}
                                     </option>
                                   );
                                 })}
                               </select>
                             
                               <select
                                 name="birthMonth"
                                 value={form.birthMonth}
                                 onChange={onChange}
                               >
                                 <option value="">월</option>
                                 {Array.from({ length: 12 }, (_, i) => (
                                   <option key={i + 1} value={i + 1}>
                                     {i + 1}
                                   </option>
                                 ))}
                               </select>
                             
                               <select
                                 name="birthDay"
                                 value={form.birthDay}
                                 onChange={onChange}
                               >
                                 <option value="">일</option>
                                 {Array.from({ length: 31 }, (_, i) => (
                                   <option key={i + 1} value={i + 1}>
                                     {i + 1}
                                   </option>
                                 ))}
                               </select>
                             </div>
                             {errors.birth && <p className="form-error">{errors.birth}</p>}
                             


                            {/* 약관 동의 */}
                            <div className="agree-box">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="agreeAll"
                                        checked={form.agreeAll}
                                        onChange={onChange}
                                    />
                                    <span>모두 동의합니다.</span>
                                </label>

                                <label>
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={form.agreeTerms}
                                        onChange={onChange}
                                    />
                                    <span>(필수) 이용약관과 개인정보 수집 및 이용에 동의합니다.</span>
                                </label>
                                {errors.agreeTerms && <p className="form-error">{errors.agreeTerms}</p>}

                                <label>
                                    <input
                                        type="checkbox"
                                        name="agreeAge14"
                                        checked={form.agreeAge14}
                                        onChange={onChange}
                                    />
                                    <span>(필수) 만 14세 이상입니다.</span>
                                </label>
                                {errors.agreeAge14 && <p className="form-error">{errors.agreeAge14}</p>}

                                <label>
                                    <input
                                        type="checkbox"
                                        name="agreeMarketing"
                                        checked={form.agreeMarketing}
                                        onChange={onChange}
                                    />
                                    <span>
                                        (선택) 이메일 및 SMS 마케팅 정보 수신에 동의합니다.<br />
                                        회원은 언제든지 회원 정보에서 수신 거부로 변경할 수 있습니다.
                                    </span>
                                </label>
                            </div>

                            <div id="button-box">
                                <button id="sign" type="submit">가입하기</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            <Footer />
        </>
    );
}