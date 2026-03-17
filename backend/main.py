from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rdkit import Chem
from rdkit.Chem import Descriptors

app = FastAPI()

# 🔑 สำคัญมาก: อนุญาตให้ React (Frontend) คุยกับ Python ได้
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

class MoleculeRequest(BaseModel):
    smiles: str

# เพิ่มฟังก์ชันหน้าแรกเพื่อไม่ให้ขึ้น Not Found
@app.get("/")
def home():
    return {"status": "Online", "system": "MANORAA Analysis Engine v3.2"}

# ฟังก์ชันหลักที่ React จะเรียกใช้
@app.post("/analyze")
async def analyze(request: MoleculeRequest):
    mol = Chem.MolFromSmiles(request.smiles)
    if not mol:
        return {"error": "Invalid Chemical Structure"}
    
    return {
        "smiles": request.smiles,
        "mw": round(Descriptors.MolWt(mol), 2),
        "logp": round(Descriptors.MolLogP(mol), 2),
        "hbd": Descriptors.NumHDonors(mol),
        "hba": Descriptors.NumHAcceptors(mol)
    }