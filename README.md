# 🔥 React Tic Tac Toe Game - Full DevOps Deployment 🚀

A feature-rich, mobile-responsive Tic Tac Toe game built with ReactJS and deployed on Azure via a fully automated DevOps pipeline using Docker, Terraform, and GitHub Actions.

---

## 🎮 Game Features

- Play vs Human or AI (Easy & Hard/Minimax)
- Theme Toggle (Dark/Light Mode)
- Responsive Design
- Sound Effects (Click, Win, Reset)
- Scoreboard & Timer
- Undo & Reset support

---

## 🛠 DevOps Stack

| Tool        | Purpose                               |
|-------------|----------------------------------------|
| **Docker**  | Containerize React App                |
| **Docker Hub** | Store built image                    |
| **Azure App Service** | Host Docker container               |
| **Terraform** | Provision Azure Infrastructure       |
| **GitHub Actions** | CI/CD workflows                   |
| **Trivy** | Security scanning (Docker + Terraform) |
| **Infracost** | Infra cost estimation                 |

---

## 📦 Project Structure

```
root
├── tictactoe/                  # CRA React app
├── terraform/                  # Infrastructure as Code
├── .github/workflows/          # CI/CD Pipelines
├── Dockerfile
└── README.md
```

---

## ⚙️ GitHub Actions Workflows

| File | Description |
|------|-------------|
| `build-push.yml` | Builds Docker image, scans with Trivy, pushes to Docker Hub |
| `terraform-deploy.yml` | Deploys Azure resources using Terraform |
| `terraform-destroy.yml` | Destroys infrastructure safely with confirmation |
| `cost-estimate.yml` | Generates cost estimate using Infracost (artifact only) |
| `security-scan.yml` | Scans Docker image + Terraform code and uploads artifacts |

---

## 🔐 Required GitHub Secrets

| Secret Name                | Description                       |
|---------------------------|-----------------------------------|
| `DOCKERHUB_USERNAME`      | Docker Hub username               |
| `DOCKERHUB_TOKEN`         | Docker Hub access token           |
| `AZURE_CLIENT_ID`         | Azure SPN client ID               |
| `AZURE_CLIENT_SECRET`     | Azure SPN secret                  |
| `AZURE_SUBSCRIPTION_ID`   | Azure subscription ID             |
| `AZURE_TENANT_ID`         | Azure tenant ID                   |
| `TF_STATE_RG`             | Azure RG for backend state        |
| `TF_STATE_STORAGE`        | Storage account for state         |
| `TF_STATE_CONTAINER`      | State container name              |
| `TF_STATE_KEY`            | Unique key for this state file    |
| `INFRACOST_API_KEY`       | API key from infracost.io         |

---

## 🚀 Deployment Instructions

1. **Clone the Repository**
2. **Set up GitHub Secrets** (see above)
3. **Push to `main`** to trigger Docker image build
4. **Run `Terraform Deploy` workflow manually**
5. **Visit the deployed app URL from workflow output**

---

## 💰 Cost Estimation

Run the `cost-estimate.yml` workflow anytime to generate a downloadable artifact estimating your Azure costs via [Infracost](https://www.infracost.io/).

---

## 🛡 Security Scanning

- **Trivy** scans Docker images & IaC code on every pipeline
- Reports are downloadable as GitHub Action artifacts

---

## 📷 Screenshots

<img width="887" height="318" alt="Screenshot 2025-08-04 235810" src="https://github.com/user-attachments/assets/942206c1-8b92-4b53-8ea6-1015a856a632" />
<img width="673" height="269" alt="Screenshot 2025-08-04 235744" src="https://github.com/user-attachments/assets/b28b1d16-668b-4b32-8891-b452eb4a80f0" />
<img width="530" height="415" alt="image" src="https://github.com/user-attachments/assets/99d9491e-e1d6-4fb2-b1a3-98c9713953d6" />
<img width="500" height="413" alt="image" src="https://github.com/user-attachments/assets/6df838af-ce45-49eb-ac5c-dc1d64d7c467" />


---

## 👨‍💻 Author

**Saket Kumar Vishwakarma**  
DevOps Engineer | System Engineer @ TCS  
🇮🇳 India | [LinkedIn](#) *(Add your link here)*

---

## 📜 License

MIT License

---

Feel free to fork, star ⭐, and share! PRs welcome. 🙌
