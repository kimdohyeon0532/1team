// src/pages/MypageEdit.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AccountProfileForm from "../components/AccountProfileForm";
// (옵션) 전역 auth가 있다면 import 후 동기화 가능
// import { useAuth } from "../store/auth";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

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
function readCurrent() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function MypageEdit() {
  const navigate = useNavigate();
  // const { login } = useAuth(); // (옵션) 전역 auth 갱신용
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState(null); // AccountProfileForm에 넘길 초기값
  const [originalUsername, setOriginalUsername] = useState(""); // 아이디 변경 감지/중복체크용

  useEffect(() => {
    const current = readCurrent();
    if (!current) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const users = readUsers();
    const full = users.find(u => u.username === current.username);

    if (!full) {
      // currentUser는 있는데 users에 없는 비정상 상태
      alert("사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
      localStorage.removeItem(CURRENT_USER_KEY);
      navigate("/login");
      return;
    }

    // AccountProfileForm이 기대하는 필드 구성
    // (필요 시 폼 내부 필드명에 맞춰 자유롭게 확장/매핑)
    const init = {
      id: full.username,           // 아이디(=username)
      name: full.name || "",
      email: full.email || "",
      phone: full.phone || "",     // 없을 수 있음
      address: full.address || "", // 없을 수 있음
      // 추가 필드가 있다면 여기에 붙이기
    };

    setOriginalUsername(full.username);
    setInitial(init);
    setLoading(false);
  }, [navigate]);

  const handleSubmit = async (payload) => {
    // payload는 AccountProfileForm이 반환하는 최종 값
    // 예: { id, name, email, phone, address, ... }
    const users = readUsers();

    // 기존 사용자 찾기
    const idx = users.findIndex(u => u.username === originalUsername);
    if (idx === -1) {
      alert("사용자 정보를 찾을 수 없습니다.");
      return;
    }

    const nextUsername = (payload.id || "").trim();
    if (!nextUsername) {
      alert("아이디를 입력해주세요.");
      return;
    }

    // 아이디를 변경했다면 중복 체크
    if (nextUsername !== originalUsername) {
      const taken = users.some((u, i) => i !== idx && u.username === nextUsername);
      if (taken) {
        alert("이미 사용 중인 아이디입니다.");
        return;
      }
    }

    // 기존 레코드 보존 + 일부 필드 갱신
    const prev = users[idx];
    const updated = {
      ...prev,
      username: nextUsername,
      name: (payload.name || "").trim(),
      email: (payload.email || "").trim(),
      phone: (payload.phone || "").trim(),
      address: (payload.address || "").trim(),
      // prev.password, prev.birth, prev.agree, prev.createdAt 등은 유지
      updatedAt: new Date().toISOString(),
    };

    const nextUsers = [...users];
    nextUsers[idx] = updated;
    writeUsers(nextUsers);

    // currentUser도 갱신
    const nextCurrent = {
      username: updated.username,
      name: updated.name,
      email: updated.email,
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(nextCurrent));

    // (옵션) 전역 auth에도 반영
    // login(nextCurrent);

    alert("회원정보가 수정되었습니다.");
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <>
        <Header />
        <main style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
          <p>로딩 중…</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <AccountProfileForm
          initial={initial}
          onSubmit={handleSubmit}
          onCancel={() => window.history.back()}
          onFindAddress={() => {
            alert("주소 찾기 클릭");
            // TODO: 카카오/다음 주소검색 모달 연동
          }}
        />
      </main>
      <Footer />
    </>
  );
}
