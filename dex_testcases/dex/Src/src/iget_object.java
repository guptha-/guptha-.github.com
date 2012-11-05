public class iget_object {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_iobject t = new Getter_iobject();

		//System.out.println("Result should be null");
		System.out.println(t.i_get());

	}

}

class Getter_iobject {
	public Object i;

	public Object i_get() {
		i = null;
		return i;
	}
}