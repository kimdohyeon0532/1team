// src/components/AccountProfileForm.jsx  (순수 CSS 버전)
import React, { useEffect, useMemo, useState } from "react";
import "./AccountProfileForm.css";

export default function AccountProfileForm({
  initial = {},
  onSubmit,
  onCancel,
  onFindAddress,
}) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    emailLocal: "",
    emailDomain: "",
    phone: "",
    zip: "",
    addr1: "",
    addr2: "",
    marketingOptIn: false,
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [emailCustomDomain, setEmailCustomDomain] = useState("");
  const [showPwModal, setShowPwModal] = useState(false);
  const [pw, setPw] = useState({ cur: "", next: "", next2: "" });
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const email = String(initial.email || "");
    const [local, domain] = email.split("@");
    setForm((s) => ({
      ...s,
      id: initial.id || "",
      name: initial.name || "",
      emailLocal: local || "",
      emailDomain: domain || "",
      phone: normalizePhone(initial.phone || ""),
      zip: initial.zip || "",
      addr1: initial.addr1 || "",
      addr2: initial.addr2 || "",
      marketingOptIn: Boolean(initial.marketingOptIn),
    }));
  }, [initial]);

  function normalizePhone(v) {
    return v.replace(/[^0-9]/g, "").replace(/^(\d{3})(\d{3,4})(\d{4}).*/, "$1-$2-$3");
  }
  function fullEmail() {
    const domain = form.emailDomain === "custom" ? emailCustomDomain : form.emailDomain;
    if (!form.emailLocal || !domain) return "";
    return `${form.emailLocal}@${domain}`;
  }
  function setField(key, value) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  const errors = useMemo(() => {
    const e = {};
    if (!form.id) e.id = "아이디는 필수입니다.";
    if (!form.name) e.name = "이름을 입력하세요.";
    const email = fullEmail();
    if (!email) e.email = "이메일을 올바르게 입력하세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "이메일 형식이 올바르지 않습니다.";
    if (!/^(010|011|016|017|018|019)-\d{3,4}-\d{4}$/.test(form.phone)) e.phone = "휴대폰 번호를 확인하세요.";
    if (!form.zip || !form.addr1) e.addr = "주소를 정확히 입력하세요.";
    if (showPwModal) {
      if (!pw.cur) e.pwcur = "현재 비밀번호를 입력하세요.";
      if (!pw.next) e.pwnext = "새 비밀번호를 입력하세요.";
      if (pw.next && pw.next.length < 8) e.pwlen = "비밀번호는 8자 이상이어야 합니다.";
      if (pw.next && !/[0-9]/.test(pw.next)) e.pwdigit = "숫자를 포함하세요.";
      if (pw.next && !/[A-Za-z]/.test(pw.next)) e.pwalpha = "영문을 포함하세요.";
      if (pw.next !== pw.next2) e.pwmatch = "새 비밀번호가 일치하지 않습니다.";
    }
    return e;
  }, [form, pw, showPwModal, emailCustomDomain]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      setToast({ type: "error", msg: "입력값을 다시 확인해 주세요." });
      return;
    }
    try {
      setBusy(true);
      const payload = {
        id: form.id,
        name: form.name,
        email: fullEmail(),
        phone: form.phone,
        zip: form.zip,
        addr1: form.addr1,
        addr2: form.addr2,
        marketingOptIn: form.marketingOptIn,
        profileFile,
        password: showPwModal ? { ...pw } : undefined,
      };
      await onSubmit?.(payload);
      setToast({ type: "success", msg: "회원정보가 저장되었습니다." });
      setShowPwModal(false);
    } catch (err) {
      setToast({ type: "error", msg: err?.message || "저장 중 오류가 발생했습니다." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="account-wrap">
      <h1 className="account-title">회원정보 변경</h1>

      <form onSubmit={handleSubmit} className="card">
        {/* Profile Row */}
        <div className="card__section card__section--border">
          <div className="profile">
            <div className="avatar">
              {profilePreview ? (
                <img src={profilePreview} alt="프로필 미리보기" />
              ) : (
                <svg aria-hidden viewBox="0 0 24 24" className="avatar__icon">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5.33 0-8 2.67-8 6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1c0-3.33-2.67-6-8-6Z" />
                </svg>
              )}
              <label className="avatar__upload">
                사진 변경
                <input
                  type="file"
                  accept="image/*"
                  className="hidden-input"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setProfileFile(file);
                    setProfilePreview(file ? URL.createObjectURL(file) : null);
                  }}
                />
              </label>
            </div>
            <div className="profile__meta">
              <p className="profile__meta-hint">프로필</p>
              <p className="profile__meta-name">{form.name || "회원"} 님</p>
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="card__section">
          <div className="grid">
            {/* ID */}
            <div className="grid__col">
              <label className="label">아이디 *</label>
              <input
                type="text"
                value={form.id}
                onChange={(e) => setField("id", e.target.value.trim())}
                className="input"
                placeholder="아이디"
              />
              {errors.id && <p className="error">{errors.id}</p>}
            </div>

            {/* Password */}
            <div className="grid__col">
              <label className="label">비밀번호 *</label>
              <div className="hstack">
                <input
                  type="password"
                  value={pw.cur}
                  onChange={(e) => setPw({ ...pw, cur: e.target.value })}
                  className="input input--grow"
                  placeholder="현재 비밀번호"
                  aria-describedby="pw-help"
                />
                <button type="button" onClick={() => setShowPwModal(true)} className="btn btn--ghost">
                  비밀번호 변경
                </button>
              </div>
              <p id="pw-help" className="hint">보안을 위해 재확인이 필요합니다.</p>
            </div>

            {/* Name */}
            <div className="grid__col">
              <label className="label">이름 *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                className="input"
                placeholder="홍길동"
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="grid__col">
              <label className="label">이메일 *</label>
              <div className="email">
                <input
                  className="input email__local"
                  placeholder="name"
                  value={form.emailLocal}
                  onChange={(e) => setField("emailLocal", e.target.value)}
                />
                <div className="email__at">@</div>
                <select
                  className="input email__domain"
                  value={form.emailDomain}
                  onChange={(e) => setField("emailDomain", e.target.value)}
                >
                  <option value="">도메인 선택</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="nate.com">nate.com</option>
                  <option value="custom">직접 입력</option>
                </select>
              </div>
              {form.emailDomain === "custom" && (
                <input
                  className="input input--mt8"
                  placeholder="예: mydomain.co.kr"
                  value={emailCustomDomain}
                  onChange={(e) => setEmailCustomDomain(e.target.value)}
                />
              )}
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="grid__col">
              <label className="label">휴대폰 번호 *</label>
              <input
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={(e) => setField("phone", normalizePhone(e.target.value))}
                className="input"
                placeholder="010-0000-0000"
              />
              <label className="check">
                <input
                  type="checkbox"
                  checked={form.marketingOptIn}
                  onChange={(e) => setField("marketingOptIn", e.target.checked)}
                />
                <span>정보/이벤트 알림 수신 동의</span>
              </label>
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div className="grid__col grid__col--full">
              <label className="label">주소 *</label>
              <div className="addr">
                <input
                  className="input addr__zip"
                  placeholder="우편번호"
                  value={form.zip}
                  onChange={(e) => setField("zip", e.target.value.replace(/[^0-9-]/g, ""))}
                  aria-label="우편번호"
                />
                <button type="button" className="btn btn--ghost addr__find" onClick={() => onFindAddress?.()}>
                  주소 찾기
                </button>
                <input
                  className="input addr__base"
                  placeholder="기본 주소"
                  value={form.addr1}
                  onChange={(e) => setField("addr1", e.target.value)}
                  aria-label="기본 주소"
                />
                <input
                  className="input addr__detail"
                  placeholder="상세 주소"
                  value={form.addr2}
                  onChange={(e) => setField("addr2", e.target.value)}
                  aria-label="상세 주소"
                />
              </div>
              {errors.addr && <p className="error">{errors.addr}</p>}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card__actions">
          <button type="button" onClick={onCancel} className="btn">
            취소
          </button>
          <button type="submit" disabled={busy} className="btn btn--primary">
            {busy ? "저장 중..." : "회원정보 수정"}
          </button>
        </div>
      </form>

      {/* Password Modal */}
      {showPwModal && (
        <div role="dialog" aria-modal="true" className="modal-overlay">
          <div className="modal">
            <h2 className="modal__title">비밀번호 변경</h2>
            <p className="hint">안전을 위해 강력한 비밀번호를 사용하세요.</p>
            <div className="vstack">
              <input
                type="password"
                className="input"
                placeholder="현재 비밀번호"
                value={pw.cur}
                onChange={(e) => setPw({ ...pw, cur: e.target.value })}
              />
              <input
                type="password"
                className="input"
                placeholder="새 비밀번호 (영문+숫자 8자 이상)"
                value={pw.next}
                onChange={(e) => setPw({ ...pw, next: e.target.value })}
              />
              <input
                type="password"
                className="input"
                placeholder="새 비밀번호 확인"
                value={pw.next2}
                onChange={(e) => setPw({ ...pw, next2: e.target.value })}
              />
              <ul className="error-list">
                {Object.entries(errors)
                  .filter(([k]) => k.startsWith("pw"))
                  .map(([k, v]) => (
                    <li key={k}>{v}</li>
                  ))}
              </ul>
            </div>
            <div className="modal__actions">
              <button className="btn" onClick={() => setShowPwModal(false)}>
                닫기
              </button>
              <button
                className="btn btn--primary"
                type="button"
                onClick={() => {
                  if (Object.keys(errors).some((k) => k.startsWith("pw"))) return;
                  setToast({ type: "success", msg: "비밀번호 조건을 통과했습니다. 저장 시 반영됩니다." });
                  setShowPwModal(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type === "success" ? "toast--success" : "toast--error"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
