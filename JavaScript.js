<script>
    // --- 1. ตั้งค่า IP เซิร์ฟเวอร์ของคุณที่นี่ ---
    const SERVER_IP = "play.hypixel.net"; // เปลี่ยนเป็น IP ของคุณ เช่น mc-thailand.com

    // --- 2. ฟังก์ชันคัดลอก IP และเปลี่ยนข้อความปุ่ม ---
    function copyIP() {
        navigator.clipboard.writeText(SERVER_IP);
        
        // หาปุ่มและเก็บข้อความเดิมไว้
        const btn = document.querySelector('.btn');
        const originalText = btn.innerText;
        
        // เปลี่ยนข้อความบนปุ่ม
        btn.innerText = "คัดลอกสำเร็จ! ✅";
        btn.style.background = "#ffffff";
        btn.style.color = "#000000";

        // รอ 2 วินาทีแล้วเปลี่ยนกลับเป็นเหมือนเดิม
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = ""; // กลับไปใช้สีเดิมใน CSS
            btn.style.color = "";
        }, 2000);
    }

    // --- 3. ฟังก์ชันเช็คสถานะเซิร์ฟเวอร์จริง ---
    async function checkServerStatus() {
        const statusText = document.getElementById('server-status');
        const playerCount = document.getElementById('player-count');

        try {
            const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
            const data = await response.json();

            if (data.online) {
                statusText.innerText = "SERVER ONLINE";
                statusText.style.color = "#55ff55"; // สีเขียว
                playerCount.innerText = data.players.online + " / " + data.players.max;
            } else {
                statusText.innerText = "SERVER OFFLINE";
                statusText.style.color = "#ff5555"; // สีแดง
                playerCount.innerText = "0";
            }
        } catch (error) {
            console.error("Error:", error);
            statusText.innerText = "ไม่สามารถดึงข้อมูลได้";
        }
    }

    // สั่งให้เช็คสถานะทันทีที่เปิดหน้าเว็บ
    checkServerStatus();
    // (แถม) เช็คซ้ำทุกๆ 30 วินาทีเพื่อให้ข้อมูลสดใหม่เสมอ
    setInterval(checkServerStatus, 30000);
</script>
