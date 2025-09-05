// src/pages/SignUpPage.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./SignupPage.css";

const USERS_KEY = "users"; // 사용자 목록을 localStorage에 저장
// const CURRENT_USER_KEY = "currentUser"; // 가입 후 로그인 페이지로 보낼 거라 사용하지 않음

// 안전 파서
function readUsers() {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}
function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function pad2(n) {
    return String(n).padStart(2, "0");
}
function isValidEmail(v) {
    // 데모용 느슨한 검사
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function daysInMonth(year, month) {
    // month: 1~12
    if (!year || !month) return 31;
    return new Date(Number(year), Number(month), 0).getDate();
}

export default function SignUpPage() {
    const navigate = useNavigate();

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
        agreeTerms: false,     // (필수) 이용약관/개인정보
        agreeAge14: false,     // (필수) 만 14세 이상
        agreeMarketing: false, // (선택) 마케팅 수신
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const maxDay = useMemo(() => {
        return daysInMonth(form.birthYear, form.birthMonth);
    }, [form.birthYear, form.birthMonth]);

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;

        // 개별 체크박스: agreeAll은 제외
        if (type === "checkbox" && name !== "agreeAll") {
            const next = { ...form, [name]: checked };
            const allChecked = next.agreeTerms && next.agreeAge14 && next.agreeMarketing;
            setForm({ ...next, agreeAll: allChecked });
            return;
        }

        // 모두 동의
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

        // 생일 일자 보정(월/년 변경 시 현재 일자가 최대일 초과면 초기화)
        if (name === "birthMonth" || name === "birthYear") {
            const next = { ...form, [name]: value };
            const nextMax = daysInMonth(
                name === "birthYear" ? value : form.birthYear,
                name === "birthMonth" ? value : form.birthMonth
            );
            if (Number(next.birthDay) > nextMax) next.birthDay = "";
            setForm(next);
            return;
        }

        setForm({ ...form, [name]: value });
    };

    const validate = () => {
        const e = {};
        const username = form.username.trim();
        const name = form.name.trim();
        const email = form.email.trim().toLowerCase();

        if (!username) e.username = "아이디를 입력하세요.";
        if (!name) e.name = "이름을 입력하세요.";
        if (!form.password || form.password.length < 6) e.password = "비밀번호는 6자 이상이어야 해요.";
        if (form.password !== form.passwordConfirm) e.passwordConfirm = "비밀번호가 일치하지 않습니다.";

        if (!email) e.email = "이메일을 입력하세요.";
        else if (!isValidEmail(email)) e.email = "이메일 형식을 확인하세요.";

        if (!form.birthYear || !form.birthMonth || !form.birthDay) {
            e.birth = "생년월일을 모두 선택하세요.";
        }

        if (!form.agreeTerms) e.agreeTerms = "필수 약관에 동의해야 가입할 수 있습니다.";
        if (!form.agreeAge14) e.agreeAge14 = "만 14세 이상에 동의해야 가입할 수 있습니다.";
        return e;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (submitting) return;

        // 1) 기본 폼 검증
        const eMap = validate();

        // 2) 로컬 중복 검사 (아이디/이메일 대소문자 무시)
        const users = readUsers();
        const usernameTrim = form.username.trim();
        const emailTrim = form.email.trim().toLowerCase();

        const usernameTaken = users.some(u => (u.username || "").toLowerCase() === usernameTrim.toLowerCase());
        const emailTaken = users.some(u => (u.email || "").toLowerCase() === emailTrim);

        if (usernameTaken) eMap.username = "이미 사용 중인 아이디입니다.";
        if (emailTaken) eMap.email = "이미 가입된 이메일입니다.";

        setErrors(eMap);
        if (Object.keys(eMap).length) return;

        // 3) 저장
        setSubmitting(true);
        try {
            const birth = `${form.birthYear}-${pad2(form.birthMonth)}-${pad2(form.birthDay)}`;
            const newUser = {
                username: usernameTrim,
                name: form.name.trim(),
                // ⚠️ 데모이므로 평문 저장. 실제 서비스에서는 서버에서 해시 필수!
                password: form.password,
                email: emailTrim,
                birth,
                agree: {
                    terms: form.agreeTerms,
                    age14: form.agreeAge14,
                    marketing: form.agreeMarketing,
                },
                createdAt: new Date().toISOString(),
            };

            const nextUsers = [...users, newUser];
            writeUsers(nextUsers);

            // 4) 알림 후 로그인 페이지로 이동
            alert("회원가입이 완료되었습니다.");
            navigate("/login", { replace: true });
        } finally {
            setSubmitting(false);
        }
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
                                autoComplete="username"
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
                                autoComplete="name"
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
                                autoComplete="new-password"
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
                                autoComplete="new-password"
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
                                autoComplete="email"
                            />
                            {errors.email && <p className="form-error" id="err-email">{errors.email}</p>}

                            {/* 생년월일 */}
                            <label htmlFor="birth">생년월일 ⁕</label>
                            <div className="birth-box" id="birth">
                                <select name="birthYear" value={form.birthYear} onChange={onChange}>
                                    <option value="">년도</option>
                                    {Array.from({ length: 100 }, (_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
                                </select>

                                <select name="birthMonth" value={form.birthMonth} onChange={onChange}>
                                    <option value="">월</option>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>

                                <select name="birthDay" value={form.birthDay} onChange={onChange}>
                                    <option value="">일</option>
                                    {Array.from({ length: maxDay }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
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
                                <button id="sign" type="submit" disabled={submitting}>
                                    {submitting ? "처리 중..." : "가입하기"}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            <Footer />
        </>
    );
}
