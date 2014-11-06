using UnityEngine;
using System.Collections;

public class Break : MonoBehaviour {

	// Use this for initialization
	public void BreakSelf(){
		GameObject.Destroy (gameObject);
		enabled = false;
	}
}
