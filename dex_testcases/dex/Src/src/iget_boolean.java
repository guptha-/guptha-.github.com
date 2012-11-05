public class iget_boolean {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_ibool t = new Getter_ibool();

		//System.out.println("Result should be ture");
		System.out.println(t.i_get());

	}

}

class Getter_ibool {
	public boolean i;

	public boolean i_get() {
		i = true;
		return i;
	}
}


