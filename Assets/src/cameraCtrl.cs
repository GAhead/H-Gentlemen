using UnityEngine;
using System.Collections;

///
/// 绑定在相机上的脚本,一点触屏旋转角度，2点触屏拉近拉远相机，无缓冲效果
///
public class cameraCtrl : MonoBehaviour
{
	public Transform target;
	public float distance = 10.0f;
	public float minDistance = 3f;
	public float maxDistance = 15f;
	
	public float xSpeed = 250.0f;
	public float ySpeed = 120.0f;    
	
	public int yMinLimit = -20;
	public int yMaxLimit = 80;
	
	public float x = 0.0f;
	public float y = 0.0f;
	public bool IsUse = true;
	private Vector2 oldPosition1 = Vector3.zero;
	private Vector2 oldPosition2 = Vector3.zero;
	
	void Start()
	{
		x = this.transform.eulerAngles.y;
		y = this.transform.eulerAngles.x;
		
		if (GetComponent<Rigidbody>())
			GetComponent<Rigidbody>().freezeRotation = true;
		
		return;
	}
	
	void Update()
	{
						//一个手指触摸
						if (1 == Input.touchCount) {
								if (Input.GetTouch (0).phase == TouchPhase.Moved) {
										x += 0.02f * xSpeed * Input.GetAxis ("Mouse X");
										y -= 0.02f * xSpeed * Input.GetAxis ("Mouse Y");
								}
						}
		
						//多点触摸
						if (Input.touchCount > 1) {
								//第一点或者第2点有移动
								if (Input.GetTouch (0).phase == TouchPhase.Moved || Input.GetTouch (1).phase == TouchPhase.Moved) {
										Vector2 tempPosition1 = Input.GetTouch (0).position;
										Vector2 tempPosition2 = Input.GetTouch (1).position;
										if (isEnlarge (oldPosition1, oldPosition2, tempPosition1, tempPosition2)) {
												//拉近相机
												if (distance > minDistance) {
														distance -= 2.0f;
												}
										} else {
												//拉远相机
												if (distance < this.maxDistance) {
														distance += 2.0f;
												}
										}
										oldPosition1 = tempPosition1;
										oldPosition2 = tempPosition2;
								}            
						}
				
		return;
	}
	
	void LateUpdate()
	{

						if (target) {
								//计算相机新的旋转角度和距离位置
								y = ClampAngle (y, yMinLimit, yMaxLimit);
								Quaternion rotation = Quaternion.Euler (y, x, 0);
								Vector3 position = rotation * new Vector3 (0.0f, 0.0f, -distance) + target.position;
			
								//调整相机
								transform.rotation = rotation;
								transform.position = position;
						}
				
		return;
	}
	
	//判断是否为放大的手势
	bool isEnlarge(Vector2 oP1, Vector2 oP2, Vector2 nP1, Vector2 nP2)
	{
		float leng1 = Mathf.Sqrt((oP1.x - oP2.x) * (oP1.x - oP2.x) + (oP1.y - oP2.y) * (oP1.y - oP2.y));
		float leng2 = Mathf.Sqrt((nP1.x - nP2.x) * (nP1.x - nP2.x) + (nP1.y - nP2.y) * (nP1.y - nP2.y));
		
		if (leng1 < leng2)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	static float ClampAngle(float angle, float min, float max)
	{
		if (angle < -360)
			angle += 360;
		if (angle > 360)
			angle -= 360;
		
		return Mathf.Clamp(angle, min, max);
	}
} 