import React, { useMemo, useState } from "react";
import "./Cart.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  // ───────────────── 장바구니 데모 데이터
  const [items, setItems] = useState([
    {
      id: 1,
      img: "/img/newIn3-1.png",
      title: "눈결개완",
      subtitle: "[Timeless Craft] 눈결의 섬세함을 닮은 수공예 유리 개완",
      price: 55000,
      qty: 1,
      ship: "20만원 이상 무료\n배송비 0원",
    },
    {
      id: 2,
      img: "/img/p_detail2-8.png",
      title: "Herb Pot 0.5L",
      subtitle: "[Timeless Craft] 분리가 가능한 찻잎 여과기가 함께 구성된 유리 찻주전자",
      price: 40000,
      qty: 2,
      ship: "0원",
    },
  ]);

  const sumProducts = useMemo(
    () => items.reduce((acc, it) => acc + it.price * it.qty, 0),
    [items]
  );
  const shippingFee = 3500; // 데모
  const baseGrand = sumProducts + shippingFee;

  // ───────────────── 주문서 상태
  const [buyer, setBuyer] = useState({
    name: "",
    addr1: "",
    addr2: "",
    zip: "",
    phone: "",
    emailLocal: "",
    emailDomain: "@gmail.com",
    emailCustom: "",
  });

  const [recv, setRecv] = useState({
    name: "",
    addr1: "",
    addr2: "",
    zip: "",
    msgPreset: "",
    msg: "",
  });

  const [coupon, setCoupon] = useState(0);
  const finalPrice = Math.max(baseGrand - coupon, 0);

  // 결제수단/카드/현금영수증
  const [pay, setPay] = useState("card");
  const [needCash, setNeedCash] = useState(false);
  const [card, setCard] = useState({
    company: "",
    inst: "0",
    number: "",
    expYY: String(new Date().getFullYear()),
    expMM: "01",
    cvc: "",
    birth: "",
  });
  const [cash, setCash] = useState({ type: "personal", phone: "", id: "" });

  // ───────────────── 유틸
  const years = Array.from({ length: 12 }, (_, i) => String(new Date().getFullYear() + i));
  const krw = (n) => n.toLocaleString("ko-KR") + "원";
  const emailFull = buyer.emailLocal + (buyer.emailDomain || buyer.emailCustom || "");

  const removeSelected = () => {
    if (window.confirm("선택상품을 삭제하시겠어요? (데모)")) setItems([]);
  };

  const findPost = (who) => {
    const base = window.prompt("주소 검색 (예: 서울시 강남구 …)");
    if (!base) return;
    if (who === "buyer") setBuyer((s) => ({ ...s, addr1: base, zip: "06200" }));
    else setRecv((s) => ({ ...s, addr1: base, zip: "06200" }));
  };

  const copyFromBuyer = () => {
    setRecv((s) => ({
      ...s,
      name: buyer.name,
      addr1: buyer.addr1,
      addr2: buyer.addr2,
      zip: buyer.zip,
    }));
  };

  const submitOrder = () => {
    if (!buyer.name) return alert("주문자 이름을 입력하세요.");
    if (!buyer.addr1) return alert("주문자 주소를 입력하세요.");
    if (!buyer.phone) return alert("휴대폰 번호를 입력하세요.");
    if (!recv.name) return alert("받으실 분을 입력하세요.");
    if (!recv.addr1) return alert("받을 주소를 입력하세요.");
    if (!/@/.test(emailFull)) return alert("이메일을 올바르게 입력하세요.");

    if (pay === "card") {
      if (!card.company) return alert("카드사를 선택하세요.");
      if (!card.number.replace(/[^0-9]/g, "")) return alert("카드번호를 입력하세요.");
      if (!card.cvc.replace(/[^0-9]/g, "")) return alert("CVC를 입력하세요.");
    }
    alert("결제를 진행합니다. (데모)");
  };

  return (
    <>
      <Header />

      {/* ───────────────── 장바구니 요약 (상단 바) */}
      <main className="cart container" aria-label="장바구니">
        <h2>장바구니</h2>
        <div className="step">
          <span>01 장바구니</span>
          <span className="active">02 주문서 작성/결제</span>
          <span>03 주문완료</span>
        </div>

        <table className="cart-table">
          <thead>
            <tr>
              <th><input type="checkbox" aria-label="전체 선택" /></th>
              <th>상품 / 옵션 정보</th>
              <th>수량</th>
              <th>상품금액</th>
              <th>합계금액</th>
              <th>배송비</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td><input type="checkbox" aria-label={`${it.title} 선택`} /></td>
                <td className="item-info">
                  <img src={it.img} alt={it.title} />
                  <div>
                    <strong>{it.title}</strong><br />
                    <span>{it.subtitle}</span>
                  </div>
                </td>
                <td>{it.qty}개</td>
                <td>{krw(it.price)}</td>
                <td>{krw(it.price * it.qty)}</td>
                <td style={{ whiteSpace: "pre-line" }}>{it.ship}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cart-actions">
          <button className="delete" type="button" onClick={removeSelected}>선택상품 삭제</button>
        </div>

        <div className="summary" aria-label="결제 요약">
          <div>
            <strong>총 {items.length}개의 상품금액</strong><br />
            <span id="sumProducts">{krw(sumProducts)}</span>
          </div>
          <i className="fa-solid fa-plus" aria-hidden="true"></i>
          <div>
            <strong>배송비</strong><br />
            <span id="shippingFee">{krw(shippingFee)}</span>
          </div>
          <span><i className="fa-solid fa-equals" aria-hidden="true"></i></span>
          <div>
            <strong>합계금액</strong><br />
            <span className="total" id="grandTotal">{krw(baseGrand)}</span>
          </div>
        </div>
      </main>

      {/* ───────────────── 주문서/결제 섹션들 */}
      <section className="checkout container" aria-label="주문서 작성 및 결제">
        {/* 주문자 정보 */}
        <div className="section">
          <div className="section-title">주문자 정보</div>
          <div className="section-body">
            <table className="cart-table slim form" role="presentation">
              <tbody>
                <tr>
                  <th><label htmlFor="buyerName">주문자 이름</label></th>
                  <td>
                    <input id="buyerName" type="text" placeholder="이름" value={buyer.name}
                      onChange={(e) => setBuyer({ ...buyer, name: e.target.value })} />
                  </td>
                </tr>
                <tr>
                  <th><label htmlFor="buyerAddr1">주소</label></th>
                  <td>
                    <div className="row-addr">
                      <input id="buyerAddr1" type="text" placeholder="기본 주소" value={buyer.addr1}
                        onChange={(e) => setBuyer({ ...buyer, addr1: e.target.value })} />
                      <button className="btn-ghost" type="button" onClick={() => findPost("buyer")}>주소 찾기</button>
                    </div>
                    <div className="row-inline" style={{ marginTop: 8 }}>
                      <input id="buyerAddr2" type="text" placeholder="상세 주소" value={buyer.addr2}
                        onChange={(e) => setBuyer({ ...buyer, addr2: e.target.value })} />
                      <input id="buyerZip" type="text" placeholder="우편번호" value={buyer.zip}
                        onChange={(e) => setBuyer({ ...buyer, zip: e.target.value })} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th><label htmlFor="buyerPhone">휴대폰 번호</label></th>
                  <td className="row-2">
                    <input id="buyerPhone" type="tel" placeholder="010-0000-0000" value={buyer.phone}
                      onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })} />
                    <span className="hint">숫자만 입력해도 됩니다</span>
                  </td>
                </tr>
                <tr>
                  <th><label htmlFor="buyerEmailLocal">이메일</label></th>
                  <td>
                    <div className="row-3">
                      <input id="buyerEmailLocal" type="text" placeholder="name" aria-label="이메일 아이디"
                        value={buyer.emailLocal}
                        onChange={(e) => setBuyer({ ...buyer, emailLocal: e.target.value })} />
                      <select id="buyerEmailDomain" aria-label="도메인 선택"
                        value={buyer.emailDomain}
                        onChange={(e) => setBuyer({ ...buyer, emailDomain: e.target.value })}>
                        <option value="@gmail.com">@gmail.com</option>
                        <option value="@naver.com">@naver.com</option>
                        <option value="@daum.net">@daum.net</option>
                        <option value="@kakao.com">@kakao.com</option>
                        <option value="">직접 입력</option>
                      </select>
                      <input id="buyerEmailCustom" type="text" placeholder="@domain.com" aria-label="직접 입력 도메인"
                        value={buyer.emailCustom}
                        onChange={(e) => setBuyer({ ...buyer, emailCustom: e.target.value })} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 배송 정보 */}
        <div className="section">
          <div className="section-title">배송 정보</div>
          <div className="section-body">
            <table className="cart-table slim form" role="presentation">
              <tbody>
                <tr>
                  <th>배송지 확인</th>
                  <td>
                    <div className="radio-line" role="radiogroup" aria-label="배송지 확인">
                      <label className="chip"><input type="radio" name="addrType" defaultChecked /> 기본 배송지</label>
                      <label className="chip"><input type="radio" name="addrType" /> 최근 배송지</label>
                      <label className="chip"><input type="radio" name="addrType" /> 직접 입력</label>
                      <label className="chip"><input type="radio" name="addrType" onChange={copyFromBuyer} /> 주문자 정보와 동일</label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th><label htmlFor="recvName">받으실 분</label></th>
                  <td>
                    <input id="recvName" type="text" placeholder="수령인 이름" value={recv.name}
                      onChange={(e) => setRecv({ ...recv, name: e.target.value })} />
                  </td>
                </tr>
                <tr>
                  <th><label htmlFor="recvAddr1">받으실 곳</label></th>
                  <td>
                    <div className="row-addr">
                      <input id="recvAddr1" type="text" placeholder="기본 주소" value={recv.addr1}
                        onChange={(e) => setRecv({ ...recv, addr1: e.target.value })} />
                      <button className="btn-ghost" type="button" onClick={() => findPost("recv")}>주소 찾기</button>
                    </div>
                    <div className="row-inline" style={{ marginTop: 8 }}>
                      <input id="recvAddr2" type="text" placeholder="상세 주소" value={recv.addr2}
                        onChange={(e) => setRecv({ ...recv, addr2: e.target.value })} />
                      <input id="recvZip" type="text" placeholder="우편번호" value={recv.zip}
                        onChange={(e) => setRecv({ ...recv, zip: e.target.value })} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th><label htmlFor="shipMsg">배송 메세지</label></th>
                  <td>
                    <div className="row-2">
                      <select id="shipMsgPreset" value={recv.msgPreset}
                        onChange={(e) => setRecv({ ...recv, msgPreset: e.target.value })}
                        onBlur={() => recv.msgPreset && setRecv((s) => ({ ...s, msg: s.msgPreset }))}>
                        <option value="">메세지를 선택하세요</option>
                        <option>부재 시 문 앞에 놓아주세요</option>
                        <option>경비실에 맡겨주세요</option>
                        <option>빠른 배송 부탁드립니다</option>
                        <option>배송 전 연락 부탁드립니다</option>
                      </select>
                      <button className="btn-ghost" type="button" onClick={() => setRecv({ ...recv, msgPreset: "", msg: "" })}>메세지 지우기</button>
                    </div>
                    <textarea id="shipMsg" className="mt8" placeholder="요청사항을 직접 입력하세요" value={recv.msg}
                      onChange={(e) => setRecv({ ...recv, msg: e.target.value })} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 결제 정보 */}
        <div className="section">
          <div className="section-title">결제 정보</div>
          <div className="section-body">
            <table className="cart-table slim" role="presentation">
              <tbody>
                <tr>
                  <th>상품합계 금액</th>
                  <td className="price">{krw(sumProducts)}</td>
                </tr>
                <tr>
                  <th>배송비</th>
                  <td className="price">{krw(shippingFee)}</td>
                </tr>
                <tr>
                  <th>쿠폰 사용</th>
                  <td>
                    <div className="row-2">
                      <select value={coupon} onChange={(e) => setCoupon(Number(e.target.value))}>
                        <option value={0}>사용안함</option>
                        <option value={3000}>[신규가입] 3,000원</option>
                        <option value={5000}>5,000원</option>
                      </select>
                      <div className="price discount">- {krw(coupon)}</div>
                    </div>
                    <div className="hint">쿠폰은 중복 사용 불가</div>
                  </td>
                </tr>
                <tr>
                  <th>최종 결제 금액</th>
                  <td className="price"><strong>{krw(Math.max(baseGrand - coupon, 0))}</strong></td>
                </tr>
              </tbody>
            </table>

            {/* 요약 바 */}
            <div className="summary summary--checkout" aria-label="최종 결제 요약">
              <div><strong>상품합계</strong><br /><span>{krw(sumProducts)}</span></div>
              <i className="fa-solid fa-plus" aria-hidden="true"></i>
              <div><strong>배송비</strong><br /><span>{krw(shippingFee)}</span></div>
              <i className="fa-solid fa-minus" aria-hidden="true"></i>
              <div><strong>쿠폰</strong><br /><span className="discount">- {krw(coupon)}</span></div>
              <span><i className="fa-solid fa-equals" aria-hidden="true"></i></span>
              <div><strong>최종 결제 금액</strong><br /><span className="total">{krw(Math.max(baseGrand - coupon, 0))}</span></div>
            </div>
          </div>
        </div>

        {/* 결제수단 선택 / 결제 */}
        <div className="section">
          <div className="section-title">결제수단 선택 / 결제</div>
          <div className="section-body">
            <div className="radio-line mb10" role="radiogroup" aria-label="결제수단">
              {[
                ["card", "신용카드"],
                ["vbank", "무통장 입금"],
                ["bank", "계좌이체"],
                ["naver", "네이버페이"],
                ["kakao", "카카오페이"],
              ].map(([v, label]) => (
                <label key={v} className="chip">
                  <input type="radio" name="pay" value={v} checked={pay === v} onChange={(e) => setPay(e.target.value)} />
                  {label}
                </label>
              ))}
            </div>

            <table className="cart-table slim leftlabel" role="presentation">
              <tbody>
                <tr>
                  <th scope="row">일반 결제</th>
                  <td>
                    {pay !== "card" ? (
                      <div className="hint">선택된 수단에서는 입력할 정보가 없습니다.</div>
                    ) : (
                      <>
                        <div className="row-2 mb10">
                          <select value={card.company} onChange={(e) => setCard({ ...card, company: e.target.value })} aria-label="카드사 선택">
                            <option value="">카드사 선택</option>
                            <option>신한</option>
                            <option>국민</option>
                            <option>현대</option>
                            <option>롯데</option>
                            <option>삼성</option>
                            <option>우리</option>
                          </select>
                          <select value={card.inst} onChange={(e) => setCard({ ...card, inst: e.target.value })} aria-label="할부 개월">
                            <option value="0">일시불</option>
                            <option value="2">2개월</option>
                            <option value="3">3개월</option>
                            <option value="6">6개월</option>
                            <option value="12">12개월</option>
                          </select>
                        </div>

                        <div className="row-4">
                          <input className="span-2" placeholder="카드 번호 (0000-0000-0000-0000)" inputMode="numeric"
                            value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} aria-label="카드 번호" />
                          <select value={card.expYY} onChange={(e) => setCard({ ...card, expYY: e.target.value })} aria-label="유효기간(년)">
                            {years.map((y) => <option key={y}>{y}</option>)}
                          </select>
                          <select value={card.expMM} onChange={(e) => setCard({ ...card, expMM: e.target.value })} aria-label="유효기간(월)">
                            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => <option key={m}>{m}</option>)}
                          </select>
                          <input placeholder="CVC" inputMode="numeric" value={card.cvc}
                            onChange={(e) => setCard({ ...card, cvc: e.target.value })} aria-label="CVC" />
                          <input placeholder="생년월일(YYMMDD) / 사업자번호" inputMode="numeric" value={card.birth}
                            onChange={(e) => setCard({ ...card, birth: e.target.value })} aria-label="생년월일 또는 사업자번호" />
                        </div>
                      </>
                    )}
                  </td>
                </tr>

                <tr>
                  <th scope="row">현금영수증/세금계산서</th>
                  <td>
                    <label className="chip" style={{ marginBottom: 8 }}>
                      <input type="checkbox" checked={needCash} onChange={(e) => setNeedCash(e.target.checked)} />
                      발행 요청
                    </label>

                    {needCash && (
                      <>
                        <div className="radio-line mb10">
                          <label className="chip">
                            <input type="radio" name="cashType" value="personal" checked={cash.type === "personal"}
                              onChange={(e) => setCash({ ...cash, type: e.target.value })} />
                            개인 소득공제
                          </label>
                          <label className="chip">
                            <input type="radio" name="cashType" value="biz" checked={cash.type === "biz"}
                              onChange={(e) => setCash({ ...cash, type: e.target.value })} />
                            지출증빙용
                          </label>
                        </div>

                        <div className="row-2">
                          <input placeholder="휴대폰 번호 / 사업자번호" value={cash.phone}
                            onChange={(e) => setCash({ ...cash, phone: e.target.value })} />
                          <input placeholder="휴대폰 인증번호(선택)" value={cash.id}
                            onChange={(e) => setCash({ ...cash, id: e.target.value })} />
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="pay-action">
              <button className="btn-pay" type="button" onClick={submitOrder}>결제하기</button>
            </div>
            <div className="hint center">결제 클릭 시 이용약관 및 개인정보 처리방침에 동의한 것으로 간주됩니다.</div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
