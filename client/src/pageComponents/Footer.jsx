const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: About Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                Welcome to our platform where you can share memories, chat, and explore projects.
                Stay connected and explore amazing experiences.
              </p>
            </div>
  
            {/* Column 2: Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
  
            {/* Column 3: Social Media Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.326C.595 0 0 .593 0 1.325v21.351C0 23.405.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.662-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.917c-1.504 0-1.794.715-1.794 1.764v2.311h3.588l-.468 3.622h-3.12V24h6.116c.729 0 1.324-.595 1.324-1.325V1.325C24 .595 23.405 0 22.675 0z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.184-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.205-4.92 4.917 0 .386.045.762.127 1.124-4.086-.205-7.713-2.165-10.141-5.144-.422.722-.664 1.561-.664 2.457 0 1.694.863 3.188 2.173 4.065-.802-.025-1.558-.246-2.215-.614v.061c0 2.364 1.681 4.337 3.917 4.784-.409.111-.84.171-1.284.171-.314 0-.618-.03-.916-.086.619 1.934 2.417 3.342 4.55 3.38-1.67 1.306-3.779 2.085-6.066 2.085-.394 0-.779-.023-1.162-.068 2.165 1.388 4.733 2.199 7.499 2.199 8.998 0 13.92-7.458 13.92-13.931 0-.211-.004-.422-.014-.632.955-.69 1.784-1.56 2.438-2.548l-.047-.02z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 5.853 2.653 5.853 5.854 0 3.205-2.653 5.853-5.853 5.853-3.204 0-5.854-2.653-5.854-5.853C6.147 4.82 8.797 2.163 12 2.163m0-2.163C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zm0 18.281c-1.913 0-3.602-1.168-4.339-2.842l.396-.046c.803 0 1.498.414 1.852 1.03.333.566.8.946 1.371.946.447 0 .869-.155 1.241-.465.352-.292.533-.72.533-1.264v-3.059h1.306c-.053 1.314-.548 2.425-1.563 3.175-.631.482-1.325.77-2.082.77m0-5.397c-1.63 0-2.953-1.327-2.953-2.953 0-1.63 1.327-2.953 2.953-2.953s2.953 1.327 2.953 2.953c0 1.63-1.327 2.953-2.953 2.953z"/></svg>
                </a>
              </div>
            </div>
          </div>
  
          <hr className="my-8 border-gray-600" />
  
          <div className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} Your Website. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  