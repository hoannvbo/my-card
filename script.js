const openQrBtn = document.getElementById("openQrBtn");
const closeQrBtn = document.getElementById("closeQrBtn");
const qrModal = document.getElementById("qrModal");
const copyAccountBtn = document.getElementById("copyAccountBtn");
const bankAccountNumber = document.getElementById("bankAccountNumber");
const copyBtnText = document.getElementById("copyBtnText");

function openModal() {
    qrModal.classList.add("show");
    qrModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeModal() {
    qrModal.classList.remove("show");
    qrModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

openQrBtn.addEventListener("click", openModal);
closeQrBtn.addEventListener("click", closeModal);

qrModal.addEventListener("click", function (event) {
    if (event.target === qrModal) {
        closeModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && qrModal.classList.contains("show")) {
        closeModal();
    }
});

copyAccountBtn.addEventListener("click", async function () {
    const accountText = bankAccountNumber.textContent.trim();

    try {
        await navigator.clipboard.writeText(accountText);
        copyBtnText.textContent = "Đã copy số tài khoản";
        copyAccountBtn.classList.add("copied");

        setTimeout(() => {
            copyBtnText.textContent = "Copy số tài khoản";
            copyAccountBtn.classList.remove("copied");
        }, 1800);
    } catch (error) {
        copyBtnText.textContent = "Không copy được";
        setTimeout(() => {
            copyBtnText.textContent = "Copy số tài khoản";
        }, 1800);
    }
});