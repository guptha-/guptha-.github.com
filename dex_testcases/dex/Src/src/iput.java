
public class iput {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Setter_i t = new Setter_i();

		//System.out.println("Result should be 2");
		System.out.println(t.i_set(1));

	}

}

class Setter_i {


	public int i_set(int i) {
		i++;
		return i;
	}
}
