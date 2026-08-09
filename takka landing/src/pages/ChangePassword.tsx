import React, { useState, useEffect } from 'react';
import './ChangePassword.css';

const SUPABASE_URL = 'https://hoohxkrrndtfpwsrnpyr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_83FGyADwb-SAJtS27eYWZA_1eNNUrwa';

export function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isErrorState, setIsErrorState] = useState(false);
  
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Parse the recovery token from URL hash
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const token  = params.get('access_token');
    const type         = params.get('type');

    if (!token || type !== 'recovery') {
      setIsErrorState(true);
    } else {
      setAccessToken(token);
    }
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setNewPassword(v);
    
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v)) s++;
    if (/[0-9]/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    setScore(s);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError1('');
    setError2('');
    
    let valid = true;
    if (newPassword.length < 8) {
      setError1('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      valid = false;
    }
    if (newPassword !== confirmPassword) {
      setError2('كلمة المرور غير متطابقة');
      valid = false;
    }
    
    if (!valid) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        method: 'PUT',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword })
      });
      
      setIsLoading(false);
      
      if (!response.ok) {
        const errorData = await response.json();
        setError1('حدث خطأ: ' + (errorData.msg || errorData.message || 'فشل تحديث كلمة المرور'));
      } else {
        setIsSuccess(true);
      }
    } catch (err: any) {
      setIsLoading(false);
      setError1('حدث خطأ: ' + err.message);
    }
  };

  const colors = ['#ff6b6b','#e8a13c','#d9c27a','#f4cf6f'];
  const labels = ['ضعيفة','مقبولة','جيدة','قوية جداً'];

  if (isErrorState) {
    return (
      <div className="change-password-page" dir="rtl" data-theme="dark">
        <div className="card">
          <div className="error-state show">
            <div className="error-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>
              </svg>
            </div>
            <h2>الرابط غير صالح</h2>
            <p>هذا الرابط منتهي الصلاحية أو تم استخدامه من قبل.<br/>تواصل مع الدعم للحصول على رابط جديد.</p>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="change-password-page" dir="rtl" data-theme="dark">
        <div className="card">
          <div className="success-state show">
            <div className="success-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#f4cf6f" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h2>تم تغيير كلمة المرور ✓</h2>
            <p>كلمة المرور الخاصة بك تم تحديثها بنجاح.<br/>يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="change-password-page" dir="rtl" data-theme="dark">
      <div className="card">
        <div className="logo">
          <div className="logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="8" height="8" rx="1.5" fill="#17191f" opacity="0.9"/>
              <rect x="13" y="3" width="8" height="8" rx="1.5" fill="#17191f" opacity="0.55"/>
              <rect x="3" y="13" width="8" height="8" rx="1.5" fill="#17191f" opacity="0.55"/>
              <rect x="13" y="13" width="8" height="8" rx="1.5" fill="#17191f" opacity="0.9"/>
            </svg>
          </div>
          <span className="logo-text">Takka <span>POS</span></span>
        </div>

        <div>
          <div className="heading">
            <span className="eyebrow">تأمين الحساب</span>
            <h1>تغيير كلمة المرور</h1>
            <p>أدخل كلمة مرور جديدة قوية لحساب Takka POS الخاص بك</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="newPassword">كلمة المرور الجديدة</label>
              <div className="input-wrap">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  placeholder="أدخل كلمة مرور جديدة"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className={error1 ? 'error-input' : ''}
                />
                <button type="button" className="toggle-pw" onClick={() => setShowNewPassword(!showNewPassword)} aria-label="إظهار/إخفاء كلمة المرور">
                  {showNewPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              
              {newPassword.length > 0 && (
                <div className="strength-wrap">
                  <div className="strength-bars">
                    {[1, 2, 3, 4].map((level) => (
                      <div 
                        key={level} 
                        className="strength-bar" 
                        style={{ background: level <= score ? colors[score-1] : 'rgba(255,255,255,0.08)' }} 
                      />
                    ))}
                  </div>
                  <span className="strength-label" style={{ color: score ? colors[score-1] : 'var(--color-muted)' }}>
                    {score ? `قوة كلمة المرور: ${labels[score-1]}` : ''}
                  </span>
                </div>
              )}
              
              {error1 && <div className="error-msg show">{error1}</div>}
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
              <div className="input-wrap">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="أعد إدخال كلمة المرور"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={error2 ? 'error-input' : ''}
                />
                <button type="button" className="toggle-pw" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label="إظهار/إخفاء كلمة المرور">
                  {showConfirmPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              {error2 && <div className="error-msg show">{error2}</div>}
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
              {!isLoading && <span>تغيير كلمة المرور</span>}
              {isLoading && <div className="spinner" style={{ display: 'block' }}></div>}
            </button>
          </form>
        </div>
        <div className="footer">© 2026 Takka POS — جميع الحقوق محفوظة</div>
      </div>
    </div>
  );
}
