public class iget_wide {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_iwide t = new Getter_iwide();

		//System.out.println("Result should be 12345679890123");
		System.out.println(t.i_get());

	}

}

class Getter_iwide {
	public long i;

	public long i_get() {
		i = 12345679890123l;
		return i;
	}
}