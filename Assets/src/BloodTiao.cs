using UnityEngine;
using System.Collections;

public class BloodTiao : MonoBehaviour {

	//角色的血条 
	public Transform bloodTiao;
	private Transform UI;
	private Object OH;
	
	//默认血条缩与摄像机的距离
	public float Fomat = 0.5f;
	public float jianGe = 0.8f;
	
	void Start () 
	{
		OH = Instantiate (bloodTiao, Vector3.zero, bloodTiao.rotation);
		UI = (Transform)OH;
		Character t = (Character)this.transform.GetComponent("Character");
		if (t) t.setUI (UI);
	}
	
	void Update () 
	{	float newFomat = Fomat * (Vector3.Distance (this.transform.position, UICamera.currentCamera.transform.position));
		UI.position = this.transform.position + Vector3.up * jianGe;
		//UI.LookAt ( - (UICamera.currentCamera.transform.forward) , UICamera.currentCamera.transform.up);
		UI.rotation = UICamera.currentCamera.transform.rotation;
		Transform ttt = UI.FindChild("Sprite2");
		UISprite tttt  =(UISprite)ttt.GetComponent("UISprite");
		if(tttt){
			Character t = (Character)this.transform.GetComponent("Character");
			if(t){
				if(t.isDying()==1 && t.life<=1){
					((Break)UI.GetComponent("Break")).BreakSelf();
					enabled=false;
				}
				tttt.fillAmount=(float)1.0*t.getHp()/t.maxHp;
			}
		}

		//计算出血条的缩放比例 .
		UI.localScale = Vector3.one * newFomat;

	}

	Transform getUI(){
		return UI;
	}
}