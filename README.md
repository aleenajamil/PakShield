# PakShield.

> **National-grade PII sanitization engine designed to meet SBP requirements for fintech infrastructure.**

PakShield is a high-performance middleware and security dashboard designed for the Pakistani fintech ecosystem. It provides automated PII (Personally Identifiable Information) masking and implements RFC 9449 (DPoP) to satisfy the **State Bank of Pakistan (SBP) Technology Risk Management (TRM) Framework**.

---

## 🔒 Core Capabilities

### 1. Automated PII Sanitization
Advanced recursive regex engine designed to detect and mask Pakistani-specific sensitive data patterns:
*   **CNIC Masking**: Automatically identifies and obfuscates Computerized National Identity Card numbers (`42101-*******-1`).
*   **Bank Account Sanitization**: Detects and masks standard 14-16 digit bank account numbers.
*   **Recursive Processing**: Deep-scans nested JSON objects in API requests/responses.

### 2. DPoP (Demonstrating Proof-of-Possession)
Hardened application-layer security to prevent token theft and replay attacks:
*   **Asymmetric Binding**: Cryptographically binds access tokens to the client's private key.
*   **RFC 9449 Compliant**: Uses ES256 Elliptic Curve signatures for request verification.
*   **Replay Protection**: Validates `htu` (target URL) and `htm` (HTTP method) for every sensitive transaction.

### 3. Real-Time Compliance Audit
A live, traceable log of all security events within the system:
*   **Audit Trail**: Every masking action and DPoP handshake is logged with a unique Verification ID.
*   **SBP Mapping**: Aligns system actions directly with TRM Framework mandates (e.g., Section 4.2).

---

## 🛠 Tech Stack

*   **Runtime**: Node.js (Full-stack Express + Vite)
*   **Backend**: Express.js with custom DPoP middleware
*   **Frontend**: React 19 + Tailwind CSS
*   **Cryptography**: `jose` (JWT/JWS library)
*   **Icons**: `lucide-react`
*   **Animations**: `motion`

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   npm (v9 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-org/pakshield.git
    cd pakshield
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

Start the full-stack development server (Backend + Frontend):
```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```
This will compile the frontend assets into the `dist/` folder, which the Express server serves in production mode.

---

## 📂 Project Structure

```text
├── src/                # React Frontend
│   ├── components/     # UI Components (Detection, Audit, Secure Portal)
│   ├── lib/            # Utility functions (cn, tailwind-merge)
│   ├── App.tsx         # Main entry component & Global State
│   └── main.tsx        # React mounting
├── server.ts           # Express Backend & Security Middleware
├── package.json        # Dependencies and Scripts
└── tsconfig.json       # TypeScript configuration
```

---

## 🛡 Security Note

PakShield is designed as a prototype demonstration of high-grade fintech security patterns. In a production environment, ensure that:
1.  Private keys for DPoP are stored securely (e.g., via Hardware Security Modules or secure TEEs).
2.  All API endpoints are served over TLS 1.3.
3.  The regex engine is regularly audited for new PII patterns unique to the region.

---