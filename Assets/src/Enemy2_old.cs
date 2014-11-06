using UnityEngine;
using System.Collections;

public class Enemy2 : MonoBehaviour
{
		public const int ENEMY_STAND = 0;
		public const int ENEMY_ATTACK = 1;
		public const int ENEMY_RUN = 2;
		public const int ENEMY_PAUSE = 3;
		private int enemyState;
		//获取要追踪的对象 a
		public GameObject playe;
		//Enemy xun luo Fanwei
		public const double AI_ATTACK_DISTANCE = 100000;
		public double MIN_DISTANCE = 1;
		public int JiaSpeed = 100;
		public int attackFrame = 30;
		public double maxSpeed = 5;
		private int wait;
	
		void Start ()
		{
				enemyState = ENEMY_STAND;
				wait = 0;
		}
	
		void Update ()
		{
				if (wait != 0) {
						transform.LookAt (playe.transform);
						wait--;
						return;
				}

		if (MIN_DISTANCE < Vector3.Distance (transform.position, playe.transform.position) && Vector3.Distance (transform.position, playe.transform.position) < AI_ATTACK_DISTANCE) {
						//敌人进入奔跑状态
						
						enemyState = ENEMY_RUN;
						//设置敌人的方向，面朝主角
						transform.LookAt (playe.transform , Vector3.up);
				} else if (Vector3.Distance (transform.position, playe.transform.position) <= MIN_DISTANCE) {
						gameObject.animation.CrossFade ("attack");
						enemyState = ENEMY_ATTACK;
						transform.LookAt (playe.transform);
						wait = attackFrame;
				}
				switch (enemyState) {
				case ENEMY_STAND:
						gameObject.animation.CrossFade ("idle"); 
						break;
				case ENEMY_RUN:
			//敌人朝主角奔跑
			//if(Vector3.Distance(transform.position,playe.transform.position ) > 3)
						{
								//transform.Translate(Vector3.forward * Time.deltaTime * 5);
							gameObject.animation.CrossFade ("run");
			//Debug.Log(Vector3.Dot( rigidbody.velocity , transform.forward) + " , " + peng);

						}
						break;
				case ENEMY_ATTACK:
						break;
				}
		}


	void OnCollisionStay(Collision co){
		//Debug.Log ("touch");
		if (enemyState == ENEMY_RUN) {
			transform.LookAt (playe.transform , Vector3.up);
			if(((Vector3.Dot( rigidbody.velocity , transform.forward)) < maxSpeed) )
				rigidbody.AddRelativeForce (Vector3.forward * JiaSpeed);
		}
	}
}

