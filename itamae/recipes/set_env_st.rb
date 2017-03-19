ENV_VAR_DIR = '/usr/local/env.yml'
ENV_VARS_SCRIPT = '/etc/profile.d/env_vars.sh'

# 転送先のパスを指定
remote_file ENV_VARS_SCRIPT do
  # レシピファイルからの相対パス
  source 'remote_files/env_vars.sh'
end

remote_file ENV_VAR_DIR do
  # レシピファイルからの相対パス
  source 'remote_files/env_st.yml'
end

include_recipe 'set_env_common.rb'
