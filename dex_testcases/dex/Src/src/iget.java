
public class iget {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_i t = new Getter_i();

		//System.out.println("Result should be 5");
		System.out.println(t.i_get());

	}

}

class Getter_i {
	public int i;

	public int i_get() {
		i = 5;
		return i;
	}
}



