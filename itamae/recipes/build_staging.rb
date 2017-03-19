# itamae ssh -h tech_push_st -u suidenOTI -j itamae/nodes/node.json itamae/recipes/build_staging.rb
include_recipe "ruby_build.rb"
include_recipe "other_library_build.rb"
include_recipe "node_env_build.rb"
include_recipe "set_env_st.rb"

# この後capistranoディレクトリでbundle exec cap staging deploy
