using UnityEngine;
using System.Collections;

public class Baby : MonoBehaviour {
	Transform m_transform;
	Animator m_ani;
	Baby m_player;
	NavMeshAgent m_agent;
	public string TagName;
	public float life = 100;
	public float AttackDistance = 15.0f;
	public float attackPower = 15;
	float m_movSpeed = 0.5f;
	float m_rotSpeed = 120f;
	private float m_timer = 2.0f;
	void Awake() {
		m_transform = this.transform;
		m_ani = this.GetComponent<Animator>();
		m_player =GameObject.FindGameObjectWithTag(TagName).GetComponent<Baby>();
		m_agent =this.GetComponent<NavMeshAgent>();
	}
	void Update () {
		if (m_player.life <= 0) 
			return;
		AnimatorStateInfo stateInfo = m_ani.GetCurrentAnimatorStateInfo (0);

		if (stateInfo.fullPathHash == Animator.StringToHash ("Base Layer.idle") && !m_ani.IsInTransition (0)) 
		{
			m_ani.SetBool("idle",false);
			m_timer -= Time.deltaTime;
			if(m_timer > 0)
				return;
			if(Vector3.Distance(m_transform.position,m_player.m_transform.position)<=AttackDistance)
			{
				m_ani.SetBool("attack",true);
			}
			else
			{
				m_timer = 1;
				m_agent.SetDestination(m_player.m_transform.position);
				m_ani.SetBool("run",true);
			}
		}

		if (stateInfo.fullPathHash == Animator.StringToHash ("Base Layer.run") && !m_ani.IsInTransition (0)) 
		{
			m_ani.SetBool("run",false);
			m_timer -= Time.deltaTime;
			if(m_timer < 0)
			{
				m_agent.SetDestination(m_player.m_transform.position);
				m_timer = 1;
			}
			MoveTo();
			if(Vector3.Distance(m_transform.position,m_player.m_transform.position)<=AttackDistance)
			{
				m_agent.ResetPath();
				m_ani.SetBool("attack",true);
			}
		}

		if(stateInfo.fullPathHash == Animator.StringToHash ("Base Layer.attack")&& !m_ani.IsInTransition(0))
		{
			RotateTo ();
			m_ani.SetBool("attack",false);
			if(stateInfo.normalizedTime>=1.0f)
			{
				m_player.life -=attackPower;
				m_ani.SetBool("idle",true);
				m_timer =2.0f;
				m_player.OnDmage(attackPower);
			}
		}
		if(stateInfo.fullPathHash == Animator.StringToHash ("Base Layer.die")&&!m_ani.IsInTransition(0))
		{
			if(stateInfo.normalizedTime>=1.0f)
			{
				print ("delete");
				Destroy(this.gameObject);
			}
		}
	}
	void OnDmage(float damage){
		life -= damage;
		print (life);
		if(life <=0)
		{
			m_ani.SetBool("die",true);
		}
	}
	void RotateTo(){
		Vector3 oldangle = m_transform.eulerAngles;
		m_transform.LookAt (m_player.m_transform);
		float target = m_transform.eulerAngles.y;
		float speed = m_rotSpeed * Time.deltaTime;
		float angle = Mathf.MoveTowardsAngle (oldangle.y, target, speed);
		m_transform.eulerAngles = new Vector3 (0, angle, 0);
	}
	void MoveTo (){
		float speed= m_movSpeed * Time.deltaTime; 
		m_agent.Move(m_transform.TransformDirection((new Vector3(0, 0, speed))));
	}
}
