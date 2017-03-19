PYENV_SCRIPT = "/etc/profile.d/pyenv.sh"

execute "upgrade pip" do
  command "source #{PYENV_SCRIPT}; pip install --upgrade pip"
end

# execute "install gensim" do
#   command "source #{PYENV_SCRIPT}; conda update conda; conda update anaconda; conda install gensim"
# end

# include_recipe "yk_mecab::install"
execute "install mecab-python3" do
  command "source #{PYENV_SCRIPT}; pip install mecab-python3"
end

execute "install mecab-python3" do
  command "source #{PYENV_SCRIPT}; pip install nkf"
end
