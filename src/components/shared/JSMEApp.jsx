import React, { useEffect, useRef } from 'react';

const JSMEApp = ({ onChange, initialSmiles = "" }) => {
  const jsmeRef = useRef(null);

  useEffect(() => {
    // ฟังก์ชันนี้จะถูกเรียกเมื่อ JSME โหลดเสร็จ
    window.jsmeOnLoad = () => {
      const jsmeApplet = new window.JSApplet.JSME("jsme_container", "100%", "400px", {
        options: "oldlook,marker,star"
      });
      jsmeRef.current = jsmeApplet;
      
      // ถ้ามีค่า SMILES เดิม ให้แสดงผลเลย
      if (initialSmiles) {
        jsmeApplet.readGenericMolecularInput(initialSmiles);
      }

      // ตรวจจับการเปลี่ยนแปลงใน Canvas
      jsmeApplet.setCallBack("AfterStructureModified", (event) => {
        const smiles = event.src.smiles();
        onChange(smiles);
      });
    };

    // กรณีที่ JSME โหลดมาแล้ว (เช่น เปิด Modal ซ้ำ)
    if (window.JSApplet && window.JSApplet.JSME) {
        window.jsmeOnLoad();
    }
  }, []);

  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div id="jsme_container"></div>
    </div>
  );
};

export default JSMEApp;