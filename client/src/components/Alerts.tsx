import React from 'react'
interface FormProps {
    formSuccess: boolean;
}

function Alerts(formSuccess: FormProps) {
  return (
    <div>
        {formSuccess && (
        <div style={{ marginTop: "20px", color: "green" }}>
          Talep başarıyla güncellendi.
        </div>
      )}
    </div>
  )
}

export default Alerts
