public class iget_long {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_ilong t = new Getter_ilong();

		//System.out.println("Result should be 1234567890L");
		System.out.println(t.i_get());

	}

}

class Getter_ilong {
	public long i;

	public long i_get() {
		i = 1234567890l;
		return i;
	}
}