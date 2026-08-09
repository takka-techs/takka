import React, { useState, useEffect } from 'react';
import { ScanLine, AlertCircle, User, GitCommitVertical, Package, Wrench, CheckCircle2, Activity, Truck, RadioTower, MessageCircle } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import './TrackMaintenance.css';

const SUPABASE_URL = 'https://hoohxkrrndtfpwsrnpyr.supabase.co';
const API_KEY = 'sb_publishable_83FGyADwb-SAJtS27eYWZA_1eNNUrwa';

export function TrackMaintenance() {
  const { theme } = useTheme();
  
  const [ticketId, setTicketId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const trackId = urlParams.get('track');
    if (trackId) {
      setTicketId(trackId);
      fetchTracking(trackId);
    }
  }, []);

  const fetchTracking = async (id: string) => {
    if (!id.trim()) {
      setErrorMsg("برجاء إدخال رقم الإيصال");
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      let numericId = id.replace(/\D/g, '');
      if (id.includes('-')) {
        const parts = id.split('-');
        numericId = parseInt(parts[parts.length - 1], 10).toString();
      }

      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_repair_status_json`, {
        method: 'POST',
        headers: {
          'apikey': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ p_ticket_id: parseInt(numericId) })
      });

      if (!response.ok) throw new Error("حدث خطأ أثناء البحث عن الإيصال");

      const resData = await response.json();
      if (resData && resData.id) {
        setResult(resData);
      } else if (Array.isArray(resData) && resData.length > 0) {
        setResult(resData[0]);
      } else {
        setErrorMsg("لم يتم العثور على إيصال بهذا الرقم. تأكد من الرقم وحاول مرة أخرى.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(ticketId);
  };

  const getStatusStep = (status: string) => {
    if (status === 'مرفوض' || status === 'مرتجع / تم الاسترداد') return -1;
    if (status === 'قيد الانتظار' || status === 'مستلم') return 1;
    if (status === 'تحت الصيانة') return 2;
    if (status === 'جاهز') return 3;
    if (status === 'تم التسليم') return 4;
    return 1;
  };

  const renderTimelineStep = (stepNumber: number, title: string, desc: string, Icon: any, currentStep: number) => {
    const isCompleted = currentStep > stepNumber || currentStep === 4;
    const isCurrent = currentStep === stepNumber;
    
    let iconBg = 'var(--surface2)';
    let iconBorder = 'var(--line)';
    let iconColor = 'var(--faint)';
    
    if (isCompleted) {
      iconBg = 'linear-gradient(135deg,#2E8B6F,#1c5f4b)';
      iconBorder = '#2E8B6F';
      iconColor = '#0B0C0E';
    } else if (isCurrent) {
      iconBg = 'linear-gradient(135deg,#F0AE6B,#D98C4A)';
      iconBorder = '#F0AE6B';
      iconColor = '#0B0C0E';
    }

    return (
      <div className={`flex items-start gap-4 sm:gap-6 relative z-10 transition-opacity ${!isCompleted && !isCurrent ? 'opacity-40 grayscale' : 'opacity-100'}`}>
        <div className={`via-node ${isCompleted ? 'done' : ''} ${isCurrent ? 'lit' : ''}`} style={{top: '14px'}}></div>
        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl shrink-0 flex items-center justify-center border-2 transition-colors duration-500"
             style={{ background: iconBg, borderColor: iconBorder, color: iconColor }}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="pt-1 sm:pt-2 min-w-0 flex-1">
          <h4 className={`text-sm sm:text-lg font-display font-bold mb-0.5 sm:mb-1 ${isCompleted || isCurrent ? 'text-[var(--ink)]' : 'text-[var(--faint)]'}`}>{title}</h4>
          <p className="text-xs sm:text-sm text-[var(--faint)]">{desc}</p>
          
          {stepNumber === 2 && isCurrent && (
            <div className="mt-2 sm:mt-3 inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold border" 
                 style={{ background: 'var(--status-progress-bg)', borderColor: 'var(--status-progress-border)', color: 'var(--status-progress-text)' }}>
              <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              يجري العمل الآن
            </div>
          )}
          
          {stepNumber === 3 && currentStep === 3 && result && (
            <div className="mt-3 sm:mt-4 p-3.5 sm:p-4 rounded-2xl border" style={{ background: 'var(--status-ready-bg)', borderColor: 'var(--status-ready-border)' }}>
              <p className="text-xs sm:text-sm font-medium mb-3" style={{ color: 'var(--status-ready-text)' }}>يسعدنا إبلاغك بأن جهازك جاهز للاستلام!</p>
              <div className="space-y-1.5">
                <p className="text-[var(--ink)]/80 text-xs sm:text-sm flex justify-between gap-2">
                  <span>التكلفة الإجمالية:</span>
                  <span className="font-bold font-mono">{result.total_amount || 0} ج.م</span>
                </p>
                <p className="text-[var(--ink)]/80 text-xs sm:text-sm flex justify-between gap-2">
                  <span>المدفوع مقدماً:</span>
                  <span className="font-bold font-mono">{result.paid_amount || 0} ج.م</span>
                </p>
                <div className="h-px my-1" style={{ background: 'var(--status-ready-border)' }}></div>
                <p className="text-xs sm:text-sm font-bold flex justify-between gap-2" style={{ color: '#2E8B6F' }}>
                  <span>المبلغ المتبقي:</span>
                  <span className="font-mono">{(result.total_amount || 0) - (result.paid_amount || 0)} ج.م</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`track-maintenance-page ${theme === 'light' ? 'light-theme' : 'dark-theme'}`} dir="rtl">
      <div className="min-h-screen flex flex-col items-center py-8 sm:py-14 px-3 sm:px-4">
        
        <div className="w-full max-w-2xl relative">
          <div className="absolute inset-x-0 -top-10 h-72 circuit-bg pointer-events-none"></div>

          {/* Brand header */}
          <div className="text-center mb-8 sm:mb-10 relative fade-up">
            <div className="logo-frame mx-auto mb-4 sm:mb-5 relative rounded-3xl overflow-hidden glow-copper">
              <img
                   src="https://lh3.googleusercontent.com/d/1bj67AD4-GeJQt2FF6jO5Jog6vsyoTzBQ"
                   alt="TAKKA"
                   className="absolute inset-0 w-full h-full object-cover"
                   onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl tracking-wide mb-1">
              <span className="text-[var(--ink)]">TAK</span><span style={{ color: '#F0AE6B' }}>KA</span>
            </h1>
            <p className="text-[var(--faint)] text-xs sm:text-sm font-medium px-4">تابع حالة صيانة جهازك لحظة بلحظة</p>
            <p className="text-[var(--faint)]/70 text-[11px] sm:text-xs font-medium mt-1 px-4">خدمة تتبع الصيانة — إحدى مزايا نظام TAKKA لإدارة الأعمال (ERP)</p>
          </div>

          {/* Search Box */}
          <div className="glass p-3 sm:p-4 rounded-3xl mb-6 sm:mb-8 fade-up" style={{ animationDelay: '.08s' }}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <ScanLine className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--faint)]" />
                <input
                  type="text"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  placeholder="رقم الإيصال (مثال: R-202410-00123)"
                  className="w-full pl-4 pr-12 py-3.5 sm:py-4 bg-[var(--surface2)] border border-[var(--line)] rounded-2xl text-[var(--ink)] outline-none focus:border-[#D98C4A] focus:ring-1 focus:ring-[#D98C4A] transition-all font-medium font-mono text-sm sm:text-base"
                  dir="ltr"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-cta px-6 sm:px-8 py-3.5 sm:py-4 text-[#1A1400] rounded-2xl font-display font-bold flex items-center justify-center gap-2 min-w-[130px] w-full sm:w-auto"
              >
                {!isLoading && <span>تتبع الآن</span>}
                {isLoading && <div className="loader"></div>}
              </button>
            </form>

            {errorMsg && (
              <div className="mt-4 p-3 sm:p-4 rounded-2xl flex items-center gap-3 border" style={{ background: 'var(--status-error-bg)', borderColor: 'var(--status-error-border)', color: 'var(--status-error-text)' }}>
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-xs sm:text-sm font-medium">{errorMsg}</p>
              </div>
            )}
          </div>

          {/* Tracking Results */}
          {result && (
            <div className="glass rounded-3xl overflow-hidden fade-up">
              {/* Device Info */}
              <div className="p-4 sm:p-8 border-b border-[var(--line)]" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)' }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <div className="min-w-0">
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--ink)] mb-1 truncate">{result.device_name}</h2>
                    <p className="text-[var(--faint)] text-xs sm:text-sm flex items-center gap-1.5">
                      <User className="w-4 h-4 shrink-0" />
                      <span className="truncate">{result.customer_name}</span>
                    </p>
                  </div>

                  {(() => {
                    const step = getStatusStep(result.status);
                    let badgeBg = 'var(--status-default-bg)';
                    let badgeBorder = 'var(--status-default-border)';
                    let badgeText = 'var(--status-default-text)';
                    let dotColor = '#D98C4A';
                    let dotAnimate = true;

                    if (step === 4) {
                      badgeBg = 'var(--status-ready-bg)'; badgeBorder = 'var(--status-ready-border)'; badgeText = 'var(--status-ready-text)'; dotColor = '#2E8B6F'; dotAnimate = false;
                    } else if (step === 3) {
                      badgeBg = 'var(--status-progress-bg)'; badgeBorder = 'var(--status-progress-border)'; badgeText = 'var(--status-progress-text)'; dotColor = '#F0AE6B'; dotAnimate = false;
                    } else if (step === -1) {
                      badgeBg = 'var(--status-error-bg)'; badgeBorder = 'var(--status-error-border)'; badgeText = 'var(--status-error-text)'; dotColor = '#EF5B5B'; dotAnimate = false;
                    }
                    
                    return (
                      <div className="px-3.5 sm:px-4 py-2 rounded-2xl flex items-center gap-2 w-fit border shrink-0" style={{ background: badgeBg, borderColor: badgeBorder, color: badgeText }}>
                        <div className={`w-2 h-2 rounded-full shrink-0 ${dotAnimate ? 'animate-pulse' : ''}`} style={{ background: dotColor }}></div>
                        <span className="font-bold text-xs sm:text-sm whitespace-nowrap">{result.status}</span>
                      </div>
                    );
                  })()}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="bg-[var(--surface2)] p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] min-w-0">
                    <p className="text-[11px] sm:text-xs text-[var(--faint)] mb-1">المشكلة / العطل</p>
                    <p className="font-medium text-[var(--ink)] text-sm sm:text-base break-words">{result.issue || 'لم يتم تسجيل وصف'}</p>
                  </div>
                  <div className="bg-[var(--surface2)] p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] min-w-0">
                    <p className="text-[11px] sm:text-xs text-[var(--faint)] mb-1">تاريخ الاستلام</p>
                    <p className="font-medium text-[var(--ink)] font-mono text-sm sm:text-base" dir="ltr">
                      {new Date(result.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-[var(--surface2)] p-2.5 sm:p-4 rounded-2xl border border-[var(--line)] text-center min-w-0">
                    <p className="text-[10px] sm:text-xs text-[var(--faint)] mb-1 truncate">التكلفة الإجمالية</p>
                    <p className="font-bold font-mono text-[var(--ink)] text-xs sm:text-base truncate">{result.total_amount || 0} ج.م</p>
                  </div>
                  <div className="bg-[var(--surface2)] p-2.5 sm:p-4 rounded-2xl border border-[var(--line)] text-center min-w-0">
                    <p className="text-[10px] sm:text-xs text-[var(--faint)] mb-1 truncate">المدفوع مقدماً</p>
                    <p className="font-bold font-mono text-[var(--ink)] text-xs sm:text-base truncate">{result.paid_amount || 0} ج.م</p>
                  </div>
                  <div className="p-2.5 sm:p-4 rounded-2xl border text-center min-w-0" style={{ background: 'var(--status-ready-bg)', borderColor: 'var(--status-ready-border)' }}>
                    <p className="text-[9px] sm:text-xs mb-1 font-bold truncate" style={{ color: 'var(--status-ready-text)' }}>المبلغ المتبقي</p>
                    <p className="font-bold font-mono text-xs sm:text-base truncate" style={{ color: '#2E8B6F' }}>{(result.total_amount || 0) - (result.paid_amount || 0)} ج.م</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-4 sm:p-8">
                <h3 className="font-display font-bold text-[var(--ink)] mb-6 sm:mb-8 text-base sm:text-lg flex items-center gap-2">
                  <GitCommitVertical className="w-5 h-5" style={{ color: '#F0AE6B' }} />
                  مسار الصيانة
                </h3>

                {getStatusStep(result.status) === -1 ? (
                  <div className="flex flex-col items-center justify-center py-8 sm:py-10 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 glow-danger" style={{ background: 'var(--status-error-bg)' }}>
                      <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: '#EF5B5B' }} />
                    </div>
                    <h4 className="text-lg sm:text-xl font-display font-bold text-[var(--ink)] mb-2">تم إيقاف عملية الصيانة</h4>
                    <p className="text-[var(--faint)] text-sm px-4">
                      حالة الجهاز الحالية: {result.status}. يرجى التواصل مع المركز لمزيد من التفاصيل.
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="trace-track"></div>
                    <div className="trace-fill" style={{ height: `${{ 1: 5, 2: 38, 3: 71, 4: 100 }[getStatusStep(result.status)] || 5}%` }}></div>
                    {getStatusStep(result.status) === 2 && <div className="pulse-dot" style={{ top: '25%' }}></div>}

                    <div className="space-y-7 sm:space-y-9 relative">
                      {renderTimelineStep(1, 'استلام الجهاز', 'تم استلام جهازك وتسجيله بالنظام', Package, getStatusStep(result.status))}
                      {renderTimelineStep(2, 'جاري الفحص والصيانة', 'المهندس يقوم بفحص وصيانة الجهاز', Wrench, getStatusStep(result.status))}
                      {renderTimelineStep(3, 'جاهز للاستلام', 'جهازك جاهز الآن، يمكنك تفضل باستلامه', CheckCircle2, getStatusStep(result.status))}
                      {renderTimelineStep(4, 'تم التسليم', 'تم تسليم الجهاز للعميل بنجاح', Truck, getStatusStep(result.status))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer / Contact */}
          <div className="mt-8 sm:mt-10 fade-up" style={{ animationDelay: '.12s' }}>
            <div className="glass rounded-3xl p-4 sm:p-8">
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <RadioTower className="w-4 h-4" style={{ color: '#F0AE6B' }} />
                <h3 className="font-display font-bold text-[var(--ink)] text-sm">تواصل معنا</h3>
              </div>

              <div className="flex items-center justify-center gap-4 sm:gap-5">
                <a href="https://wa.me/201037230660" target="_blank" rel="noopener noreferrer" aria-label="واتساب"
                   className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-[var(--surface2)] border border-[var(--line)] hover:border-[#2E8B6F] hover:-translate-y-0.5 transition-all">
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: '#2E8B6F' }} />
                </a>

                <a href="https://www.instagram.com/takka_techs/" target="_blank" rel="noopener noreferrer" aria-label="إنستغرام"
                   className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-[var(--surface2)] border border-[var(--line)] hover:border-[#D98C4A] hover:-translate-y-0.5 transition-all">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="#F0AE6B" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="5.5"/>
                    <circle cx="12" cy="12" r="4.2"/>
                    <circle cx="17.2" cy="6.8" r="1.1" fill="#F0AE6B" stroke="none"/>
                  </svg>
                </a>

                <a href="https://www.facebook.com/profile.php?id=61574502873321" target="_blank" rel="noopener noreferrer" aria-label="فيسبوك"
                   className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-[var(--surface2)] border border-[var(--line)] hover:border-[#D98C4A] hover:-translate-y-0.5 transition-all">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="#F0AE6B" strokeWidth="1.8">
                    <path d="M15 8.5h-2c-.8 0-1.5.7-1.5 1.5v2h3.3l-.5 3h-2.8v7h-3v-7H6.5v-3H8.2V9.6C8.2 7 9.9 5 12.7 5H15v3.5z"/>
                  </svg>
                </a>
              </div>
            </div>
            <p className="text-center text-[11px] sm:text-xs text-[var(--faint)] mt-5 sm:mt-6">TAKKA © 2026 — نظام إدارة أعمال متكامل (ERP)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
