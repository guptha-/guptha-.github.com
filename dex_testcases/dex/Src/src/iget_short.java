public class iget_short {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_ishort t = new Getter_ishort();

		//System.out.println("Result should be 3200");
		System.out.println(t.i_get());

	}

}

class Getter_ishort {
	public short i;

	public short i_get() {
		i = 3200;
		return i;
	}
}