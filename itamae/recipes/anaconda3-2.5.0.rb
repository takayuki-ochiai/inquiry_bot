PYENV_SCRIPT = "/etc/profile.d/pyenv.sh"

execute "install anaconda3-2.5.0" do
  command "source #{PYENV_SCRIPT}; pyenv install anaconda3-2.5.0"
end

execute "set global anaconda3-2.5.0" do
  command "source #{PYENV_SCRIPT}; pyenv global anaconda3-2.5.0; pyenv rehash"
end
