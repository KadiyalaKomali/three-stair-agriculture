from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_inventory_data():
    return {"inventory": "Inventory data loaded"}
